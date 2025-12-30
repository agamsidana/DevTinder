const express=require('express');
const profileRouter=express.Router();
const {userAuth}=require('../middlewares/userauth');
const {validateEditProfileData}=require('../utils/validation');

profileRouter.get('/profile/view',userAuth,async (req,res)=>{
  try{
    const userProfile=req.user;
    res.send(userProfile)
  }
  catch(err){
    res.status(400).send("ERROR:"+err.message)
  }
});

profileRouter.patch('/profile/edit',userAuth,async (req,res)=>{
 try{
  if(!validateEditProfileData(req)){
    throw new Error('invalid upadate fields');
  }

  const loggedInUser=req.user;
  Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);

  await loggedInUser.save()

  res.json({
    message:'user updated successfully',
    data:loggedInUser
  });
}
catch(err){
  res.send("ERROR:"+err.message)
}
});



module.exports=profileRouter;