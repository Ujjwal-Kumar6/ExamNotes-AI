import express from "express";
import isLoging from "../middleware/isLogin.js";
import { topUp } from "../controllers/topUpControllers.js";

const topUpRoute = express.Router();

topUpRoute.post("/topup",isLoging,topUp);

export default topUpRoute;