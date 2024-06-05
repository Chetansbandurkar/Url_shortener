const mongoose =require("mongoose");
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,// admin or normal user
        required:true,
        default:"NORMAL",
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true});

const User=mongoose.model('user',userSchema);
module.exports=User;