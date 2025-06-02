import dotenv from 'dotenv';
import './db.js';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import smsRouter from './routers/smsRouter.js';

const cors = require('cors');

const app = express();
dotenv.config();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON 요청 본문 파싱
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use('/api/user', rootRouter);
app.use('/api/sms', smsRouter);
export default app;
