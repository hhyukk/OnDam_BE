import dotenv from 'dotenv';
import './db.js';
import express from 'express';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import smsRouter from './routers/smsRouter.js';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON 요청 본문 파싱
app.use('/api/user', rootRouter);
app.use('/api/sms', smsRouter);
export default app;
