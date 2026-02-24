import "./confit/env.js"; // ✅ must be first
import express from "express";
import db from "./confit/db.js";
import authRout from "./route/atuhRout.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRout from "./route/userRout.js";
import aiRoute from "./route/aiRout.js";
import noteRoute from "./route/noteRoute.js";
import topUpRoute from "./route/topUpRoute.js";

const port = process.env.PORT || 8080;

const app = express();

// ✅ IMPORTANT: Webhook route MUST come BEFORE express.json()
// This ensures Stripe gets the raw body
app.use('/topup/webhook', express.raw({ type: 'application/json' }));

// ✅ Then apply JSON parsing for ALL OTHER routes
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://examnotes-ai-ujjwal.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.get("/", (req, res) => {
    res.json({
        message: "Exam Notes AI Backend is Running",
        creater: "Ujjwal Kumar"
    });
});

app.use("/auth", authRout);
app.use('/user', userRout);
app.use('/ai', aiRoute);
app.use('/notes', noteRoute);
app.use('/topup', topUpRoute); // This will now work because webhook is handled separately

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    db();
});