import express from 'express';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();


app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Update with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(express.json());
app.use(cookieParser())


connectDB()
.then(()=>{
        app.listen(process.env.PORT || 8000 , ()=>{
            console.log(`server is listing to port ${process.env.PORT}`);
        })
})
.catch((error)=>{
    console.log("DB IS FAILD TO CONNECT ", error);
})


import userRouter from "./routes/user.route.js";

app.use("/api/v1/users" , userRouter)
app.use("/api/v1/report" , userRouter)

