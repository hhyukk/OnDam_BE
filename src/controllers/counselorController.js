// controllers/counselorController.js
import Counselor from '../models/Counselor.js';

export const signUpCounselor = async (req, res) => {
  const { id, password, name, gender, phone, identification_Number, hospitalAddress } = req.body;
  const profile = req.file ? req.file.path : '';

  try {
    const exists = await Counselor.exists({ id });
    if (exists) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
    }

    await Counselor.create({
      id,
      password,
      name,
      gender,
      phone,
      identification_Number,
      hospitalAddress,
      profile,
    });

    return res.status(201).json({ message: '상담사 회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('상담사 회원가입 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
