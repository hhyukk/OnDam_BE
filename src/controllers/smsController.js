import Coolsms from 'coolsms-node-sdk';
import dotenv from 'dotenv';
dotenv.config();

// CoolSMS 서비스 객체 생성자 직접 사용
const messageService = new Coolsms(process.env.COOLSMS_API_KEY, process.env.COOLSMS_API_SECRET);

export const sendSMS = async (req, res) => {
  const { phone } = req.body;
  const SMS_SENDER = process.env.COOLSMS_SENDER_NUMBER;

  // 인증번호 생성
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const result = await messageService.sendOne({
      to: phone,
      from: SMS_SENDER,
      text: `인증번호는 ${verificationCode}입니다.`,
    });

    console.log('SMS 발송 결과:', result);
    return res.status(200).json({ message: '인증번호 전송 완료', code: verificationCode });
  } catch (error) {
    console.error('SMS 전송 오류:', error);
    return res.status(500).json({ message: 'SMS 전송 실패', error: error.message });
  }
};
