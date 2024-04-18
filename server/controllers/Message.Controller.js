const { response } = require('express');
const Message = require('../models/MessageSchema');

const sendMessage = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;
        if (!firstName || !lastName || !email || !phone || !message) {
            const customError = {
                status: 400,
                message: "Please fill out the entire form."
            };
            return next(customError);
        }

        const newMessage = await Message.create({ firstName, lastName, email, phone, message });
        res.status(200).json({ message: "Message successfully sent.", data: newMessage });
    } catch (error) {
        const customError = {
            status: 500,
            message: error.message
        };
        return next(customError);
    }
}

const getAllMessages=async(req,res,next)=>{
    try {
        const messages=await Message.find()
        if(messages){
            return res.status(200).json({messages:"successfully get messages",messages})
        }
    } catch (error) {
        
    }
}
module.exports = {sendMessage,getAllMessages}
