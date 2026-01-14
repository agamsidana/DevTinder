const express=require('express');
const { userAuth } = require('../middlewares/userauth');
const userRouter=express.Router();
const ConnectionRequest=require('../models/connectionRequest');
const User=require('../models/user')

const USER_SAFE_DATA=['firstName','lastName','skills','age','gender','photo_url']

userRouter.get('/user/request/received',userAuth,async (req,res)=>{

    try{

        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:'interested'
        }).populate('fromUserId',USER_SAFE_DATA);

        res.json({message:'Data fetched successfully',data:connectionRequest});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

userRouter.get('/user/connections',userAuth,async (req,res)=>{

    try{

        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:'accepted'},
                {fromUserId:loggedInUser._id,status:'accepted'}
            ]
        }).populate('fromUserId',USER_SAFE_DATA).populate('toUserId',USER_SAFE_DATA);

        const data=connectionRequest.map((field)=>{
            if(field.toUserId.equals(loggedInUser._id)){
                return field.fromUserId;
            }
            else{
                return field.toUserId;
            }
        });

        res.json({data})

    }
    catch(err){
        res.status(400).json({message:err.message});
    }

});

userRouter.get('/feed',userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        
        let limit=parseInt(req.query.limit) || 10;
        const page=parseInt(req.query.page) || 1;
        const skip=(page-1)*limit;

        limit=(limit>50)?50:limit

        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        });

        const hideFeedFromUser=new Set();
        connectionRequest.forEach((ele)=>{
            hideFeedFromUser.add(ele.fromUserId.toString());
            hideFeedFromUser.add(ele.toUserId.toString());
        });

        const allUser=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideFeedFromUser)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({data:allUser});
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
});

module.exports=userRouter;