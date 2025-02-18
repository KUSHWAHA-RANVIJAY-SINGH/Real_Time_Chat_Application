// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './config/database.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    return res.send('Hello from Home Page');  
 });
 
 app.get('/login',(req,res)=>{
     return res.send('Login Page');
 });
 app.get('/singup',(req,res)=>{
    return res.send("Signup page")
})

connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

