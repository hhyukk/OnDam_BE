import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
dotenv.config(); // 이걸 최상단에서 실행해야 함

const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3AvatarStorage = multerS3({
  s3: s3Client,
  bucket: 'ondam',
  acl: 'public-read',
  key: function (req, file, cb) {
    const userId = req.body.id || 'temp';
    cb(null, `certificateFile/${userId}/${Date.now()}.jpg`);
  },
});

export const profileUpload = multer({
  limits: {
    fileSize: 3000000,
  },
  storage: s3AvatarStorage,
});
