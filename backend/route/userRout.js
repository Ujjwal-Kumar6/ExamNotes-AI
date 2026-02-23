import express from 'express';
import { getCurrent } from '../controllers/userContrillers.js';
import isLoging from '../middleware/isLogin.js';

const userRout = express.Router();

userRout.get("/b1",isLoging , getCurrent);

export default userRout;