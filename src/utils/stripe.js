const stripe=require('stripe');

const stripeClient=new stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion:'2026-02-25.clover'
});

module.exports=stripeClient;