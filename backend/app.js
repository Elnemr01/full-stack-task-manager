import { configDotenv } from 'dotenv';
import express from 'express';
import userRouter from './routers/userRouter.js';
import taskRouter from './routers/taskRouter.js';
import mongoose from 'mongoose';
import createResponse from './utils/response.js';
import cors from 'cors';


// configDotenv();
const app=express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


mongoose.connect(process.env.DATABASE_URL).then(()=> {
    console.log('connected to database')
})

app.use("/users",userRouter);
app.use("/tasks",taskRouter);
app.use("*splat",(req,res)=> {
    // console.log('first')
    res.status(404).json(createResponse('error',"Route Not found"));
})






app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})