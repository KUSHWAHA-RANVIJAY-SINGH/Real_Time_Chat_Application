// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/message",messageRoute);

app.use("/api/v1/user",userRoute);

connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});

