const express=require('express');
const requestRouter=express.Router();
const ConnectionRequest=require('../models/connectionRequest');
const {userAuth}=require('../middlewares/userauth');
const User = require('../models/user');

requestRouter.post('/request/send/:status/:toUserId',userAuth,async (req,res)=>{

    try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const ALLOWED_STATUS=['ignored','interested'];

    if(!ALLOWED_STATUS.includes(status)){
        throw new Error(`${status} is not a valid status type`);
    }
    
    const existingUser=await User.findById(toUserId);
    if(!existingUser){
        return res.status(404).json({message:'User Not Found!'});
    }
    
    const existingRequest=await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    });
    if(existingRequest){
        throw new Error('Connection Request Already Exists!');
    }

    const connectionRequest=new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    });

    const data=await connectionRequest.save();


    console.log(req.user.firstName,existingUser.firstName,)

    res.json({
        message:status==='interested'?`${req.user.firstName} is ${status} in ${existingUser.firstName}`:`${req.user.firstName} ${status} ${existingUser.firstName}`,
        data
    })
}
 catch(err){
    res.status(400).json({
        message:`ERROR:${err.message}`
    })
 }

});

requestRouter.post('/request/review/:status/:requestId',userAuth,async (req,res)=>{

  try{
    const loggedInUser=req.user;
    const {status,requestId}=req.params;

    const ALLOWED_STATUS=['accepted','rejected'];
    if(!ALLOWED_STATUS.includes(status)){
        return res.status(400).json({message:"Invalid status type"});
    }

    const connectionRequest=ConnectionRequest.findOne({
        status:'interested',
        _id:requestId,
        toUserId:loggedInUser._id
    });
    if(!connectionRequest){
        return res.status(404).json({message:'Connection Request not found'});
    }

    connectionRequest.status=status;

    const data=await connectionRequest.save();

    return res.json({message:`Connection Request ${status}`,data});
 }
 catch(err){
    res.status(400).json({message:err.message});
 }
});


module.exports=requestRouter;