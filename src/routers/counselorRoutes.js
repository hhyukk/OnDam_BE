// routes/counselorRoutes.js
import express from 'express';
import { signUpCounselor } from '../controllers/counselorController.js';
import { profileUpload } from '../middlewares';

const counselorRoutes = express.Router();
counselorRoutes.post('/signup', profileUpload.single('certificateFile'), signUpCounselor);
export default counselorRoutes;
