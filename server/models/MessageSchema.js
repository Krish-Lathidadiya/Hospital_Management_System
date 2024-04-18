const mongoose=require('mongoose')
const validator=require('validator')

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
 
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,

    },
    
})

const Message=new mongoose.model('Message',messageSchema)
module.exports = Message