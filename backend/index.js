import express from "express";
import dotenv from "dotenv";
import db from "./confit/db.js";
import authRout from "./route/atuhRout.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRout from "./route/userRout.js";
import aiRoute from "./route/aiRout.js";
import noteRoute from "./route/noteRoute.js";
import topUpRoute from "./route/topUpRoute.js";


dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.get("/", (req, res) => {
    res.json({
        message: "Exam Notes AI Backend is Running",
        creater: "Ujjwal Kumar"
    })
});

app.use("/auth", authRout);
app.use('/user', userRout);
app.use('/ai', aiRoute);
app.use('/notes', noteRoute);
app.use('/topup', topUpRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    db();
});