import express from "express";
import isLoging from "../middleware/isLogin.js";
import { rtopUP, stripeWebhook } from "../controllers/topUpControllers.js";

const topUpRoute = express.Router();

topUpRoute.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
topUpRoute.post("/topup", isLoging, rtopUP);

export default topUpRoute;