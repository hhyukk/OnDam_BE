import express from 'express';
import { sendSMS, verifyCode } from '../controllers/smsController.js';

const smsRouter = express.Router();

smsRouter.post('/send', sendSMS);
smsRouter.post('/verify-code', verifyCode);

export default smsRouter;
