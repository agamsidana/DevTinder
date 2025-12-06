const express=require('express');
const connectDB=require('./config/database');
const app=express();

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

