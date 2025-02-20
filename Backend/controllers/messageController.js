import { get } from "mongoose";


export const sendmessage = async(req,res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const message = req.body.message;

        let gotConversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });
        
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            });   
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            gotConversation.message.push(newMessage._id);
        }

        await Promise.all([gotConversation.save(),newMessage.save()]);

        const receiverSocketId = getSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive_message",newMessage);
        }

        return res.status(201).json({
            message:"Message sent successfully",
        })
    } catch (error) {
        console.error(error);
    }
}

export const getmessage = async(req,res)=>{
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const Conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("message");
        return res.status(200).json(Conversation?.message);
    } catch (error) {
        console.error(error);
    }
}