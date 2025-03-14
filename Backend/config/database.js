import mongoose from "mongoose";
import {DB_NAME} from "./Constaint.js";
import dotenv from "dotenv";
dotenv.config({});
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;