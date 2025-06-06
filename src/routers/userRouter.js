import express from 'express';
import { join } from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.post('/signup', join);

export default userRouter;
