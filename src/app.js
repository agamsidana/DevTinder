const express=require('express');
const connectDB=require('./config/database');
const app=express();
const cookieParser=require('cookie-parser');

const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter)


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

