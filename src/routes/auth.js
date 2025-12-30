const express=require('express');
const authRouter=express.Router();
const {validateSignup} = require('../utils/validation');
const bcrypt=require('bcrypt');
const User=require('../models/user');
const jwt=require('jsonwebtoken');

authRouter.post('/signup',async (req,res)=>{

  try{
   validateSignup(req);
   const {password,firstName,lastName,emailId}=req.body;

   const hashedPassword=await bcrypt.hash(password,10);

   const user=new User({
    firstName,
    lastName,
    emailId,
    password:hashedPassword
   });

   await user.save();
   res.status(201).send('user created successfully');
  }
  catch(err){
    res.status(400).send('failed to save user:' + err.message);
  }

});

authRouter.post('/login',async (req,res)=>{
 try{ 
  const{password,emailId}=req.body;

  const user = await User.findOne({emailId:emailId});
  if(!user){
    throw new Error('user is not registered');
  }
  console.log(user);

  const isPasswordValid = await user.comparePassword(password);
  if(!isPasswordValid){
    throw new Error('Invalid Credentials');
  }
  const token = await user.getJWT();
  
  res.cookie('token',token,{expires:new Date(Date.now()+8*3600000)});
  res.send('user logged in successfully');
}
catch(err){
  res.status(400).send("ERROR:"+ err.message);
}

});

authRouter.post('/logout',(req,res)=>{
  res.cookie('token',null,{
    expires:new Date(Date.now())
  }).send('logout successfull!');
})


module.exports=authRouter;