import dotenv from 'dotenv';
import './db.js';
import express from 'express';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON 요청 본문 파싱
app.use('/api/user', rootRouter);
export default app;
