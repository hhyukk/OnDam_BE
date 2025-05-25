import User from '../models/User';

export const join = async (req, res) => {
  const { id, password, name, gender, phone, identification_Number, adress, profile } = req.body;

  try {
    // 아이디 중복 체크
    const exists = await User.exists({ id });
    if (exists) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
    }

    // 새 사용자 생성
    await User.create({
      id,
      password,
      name,
      gender,
      phone,
      //   identification_Number,
      adress,
      profile,
    });

    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
