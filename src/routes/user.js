const express=require('express');
const { userAuth } = require('../middlewares/userauth');
const userRouter=express.Router();
const ConnectionRequest=require('../models/connectionRequest');

userRouter.get('/user/request/received',userAuth,async (req,res)=>{

    try{

        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:'interested'
        }).populate('fromUserId',['firstName','lastName','skills','age','gender','photo_url']);

        res.json({message:'Data fetched successfully',data:connectionRequest});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports=userRouter;