import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export const register = async (req,res)=>{
    try {
        const {fullname,username,password,confirm_password,gender} = req.body;
        if (!fullname || !username || !password || !confirm_password || !gender) {
            return res.status(400).json({message:"All fields are required"});            
        }
        if (password !== confirm_password) {
            return res.status(400).json({message:"Password and confirm password do not match"});
        }
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({message:"User already exists try different username"});
        }

        //password
        const hashedpassword = await bcrypt.hash(password,10);

        //profile photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullname,
            username,
            password:hashedpassword,
            profile_photo:gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    } catch (error) {
        console.error(error);
    }
}

export const login = async (req,res)=>{
    try {
        const {username,password} = req.body;
        if (!username || !password) {
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({message:"Invalid credentials",
                success:false
            });
            
        }
      

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profile_photo:user.profile_photo,
            gender:user.gender,
            success:true
        })
    } catch (error) {
        console.error(error);
    }
}

export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
        })
    } catch (error) {
        console.error(error);
    }
}

export const getOtherUser = async (req,res)=>{
    try {
        const loggedInUserId = req.user;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("fullname username profile_photo");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.error(error);
    }
}

export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.user).select("fullname username profile_photo");
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
}

export const getAllUsername = async (req,res)=>{
    try {
        const users = await User.find().select("username");
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
    }
}