const jwt=require('jsonwebtoken');
const User=require('../models/user')

const userAuth= async(req,res,next)=>{
  try{  
    const {token}=req.cookies;

    if(!token){
        throw new Error('user not loggedIn');
    }

    const {_id} = await jwt.verify(token,'agam@123');

    const userProfile=await  User.findById(_id);

    if(!userProfile) throw new Error('user not found');

    req.user=userProfile // adding user profile to request object

    next()
 } 
 catch(err){
    res.status(400).send('ERROR:'+ err.message);
 }
}

module.exports={
    userAuth,
}