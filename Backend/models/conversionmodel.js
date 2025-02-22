import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }],
},{timestamps:true});

export const Conversation = mongoose.model("Conversion",conversionSchema);