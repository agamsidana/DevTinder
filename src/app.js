const express=require('express');
const connectDB=require('./config/database');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');

require('dotenv').config();

const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');
const userRouter = require('./routes/user');
const paymentRouter=require('./routes/payment')


require('./utils/cron-job');

app.use(express.json({
    verify:(req,res,buf)=>{
        if(req.originalUrl==='/webhook'){
            req.rawBody=buf
        }
    }
}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);
app.use('/',paymentRouter);


connectDB()
.then(()=>{
    console.log('database connection established...')

    app.listen(process.env.PORT || 7777,()=>{
    console.log('sever is listening on post 7777')
});

})
.catch(()=>{
    console.error('database connection failed');
})

