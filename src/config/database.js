const mongoose=require('mongoose');

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://sidanaagam_db_user:dacMUCnrS99ev9QW@cluster0.cqrkxrr.mongodb.net/devTinder")
}

module.exports=connectDB;