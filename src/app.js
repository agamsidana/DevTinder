const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');
const app=express();

app.use(express.json());

app.post('/signup',async (req,res)=>{

  const user=new User(req.body);

  try{
   let re= await user.save();
   console.log(re);
    res.status(201).send('user created successfully');
  }
  catch(err){
    console.log(err);
    res.status(400).send('failed to save user')
  }

});

app.get('/feed',async (req,res)=>{
  try{
    const users = await User.find({});
   if(users.length===0) res.status(404).send('user not found');
   else res.send(users);
  }
  catch(err){
    res.send('something went wrong');
  }
});

 app.delete('/user',async (req,res)=>{
  let userId=req.body.userId;

  try{
    let deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).send('User Deleted successfully');
  }
  catch(err){
    res.status(500).send('something went wrong');
  }
});

 app.patch('/user/:userid',async (req,res)=>{
  let userId=req.params.userid;
  let data=req.body;

  try{  
    let ALLOWED_UPDATES=['gender','age','about','skills','photo_url','password'];
    let isAllowedUpdates=Object.keys(data).every((ele)=>ALLOWED_UPDATES.includes(ele));
    if(!isAllowedUpdates) throw new Error('Update not allowed');

    if(data?.skills){
      if(data.skills.length>10) throw new Error('skills cannot be more than 10');
    }

    let updatedUser=await User.findByIdAndUpdate(userId,data,{returnDocument:'after',runValidators:true});
    res.status(200).send('user updated successfully');

  }
  catch(err){
    res.status(500).send('UPDATE FAILED'+err.message);
  }
});



connectDB()
.then(()=>{
    console.log('database connection established...')

    app.listen(7777,()=>{
    console.log('sever is listening on post 7777')
});

})
.catch(()=>{
    console.error('database connection failed');
})

