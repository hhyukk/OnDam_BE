import express from 'express';
import { join } from '../controllers/userControllers';
import { profileUpload } from '../middlewares';

const rootRouter = express.Router();

rootRouter.post('/signup', profileUpload.single('profile'), join);

export default rootRouter;
