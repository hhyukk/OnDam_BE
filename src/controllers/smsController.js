import Coolsms from 'coolsms-node-sdk';
import dotenv from 'dotenv';
import redisClient from '../redisClient';
dotenv.config();

// CoolSMS 서비스 객체 생성자 직접 사용
const messageService = new Coolsms(process.env.COOLSMS_API_KEY, process.env.COOLSMS_API_SECRET);
const SMS_SENDER = process.env.COOLSMS_SENDER_NUMBER;

export const sendSMS = async (req, res) => {
  const { phone } = req.body;

  // 인증번호 생성
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const result = await messageService.sendOne({
      to: phone,
      from: SMS_SENDER,
      text: `인증번호는 ${verificationCode}입니다.`,
    });

    await redisClient.setEx(`verify:${phone}`, 180, verificationCode);

    console.log('SMS 발송 결과:', result);
    return res.status(200).json({ message: '인증번호 전송 완료', code: verificationCode });
  } catch (error) {
    console.error('SMS 전송 오류:', error);
    return res.status(500).json({ message: error.message, error: error.message });
  }
};

export const verifyCode = async (req, res) => {
  const { phone, code } = req.body;

  try {
    const storedCode = await redisClient.get(`verify:${phone}`);

    if (!storedCode) {
      return res.status(400).json({ message: '인증번호가 존재하지 않거나 만료되었습니다.' });
    }

    if (storedCode !== code) {
      return res.status(400).json({ message: '인증번호가 일치하지 않습니다.' });
    }

    // 인증 성공 시 Redis에서 삭제
    await redisClient.del(`verify:${phone}`);

    return res.status(200).json({ message: '인증 성공' });
  } catch (error) {
    console.error('인증 확인 오류:', error);
    return res.status(500).json({ message: '서버 오류', error: error.message });
  }
};
