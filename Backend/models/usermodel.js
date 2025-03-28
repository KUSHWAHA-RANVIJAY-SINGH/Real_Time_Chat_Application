import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile_photo:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);