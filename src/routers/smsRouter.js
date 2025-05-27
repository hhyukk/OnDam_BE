import express from 'express';
import { sendSMS, sendVerificationCode, verifyCode } from '../controllers/smsController.js';

const smsRouter = express.Router();

smsRouter.post('/send', sendSMS);

export default smsRouter;
