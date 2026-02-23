import express from "express";
import { auth, logout } from "../controllers/authControllers.js";

const authRout = express.Router();

authRout.post("/a1", auth);
authRout.post("/a2", logout)

export default authRout