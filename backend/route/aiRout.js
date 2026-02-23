import express from "express";
import { genNotes } from "../controllers/aiControllers.js";
import isLoging from '../middleware/isLogin.js';

const aiRoute = express.Router();

aiRoute.post("/c1", isLoging , genNotes);

export default aiRoute;