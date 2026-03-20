const express=require('express');
const { userAuth } = require('../middlewares/userauth');

const paymentRouter=express.Router();
const stripeClient=require('../utils/stripe');

const User=require('../models/user');

const {memberShipPriceId}=require('../utils/constants');

const { addMonths } = require("date-fns");

paymentRouter.post('/create-order',userAuth,async (req,res)=>{

    const memberShipType=req.body?.memberShipType;


    if(!memberShipType){
        return res.status(400).json({message:'memberShipType is required'});
    }

    const loggedInUser=req.user;

    //stripe customer creation

    const user=await User.findById(loggedInUser._id);
    

    //only create customer on stripe when user is new or have no stripeCustomerId is DB;
    if(!user.stripeCustomerId){

        const customer=await stripeClient.customers.create({email:loggedInUser.email});

        const customerId=customer.id;

        user.stripeCustomerId=customerId;

        await user.save();

    }

    const priceId=memberShipType==='Silver' ? memberShipPriceId.silver : memberShipPriceId.gold;

  
    try{

        const session=await stripeClient.checkout.sessions.create({
            mode:'payment',
            customer:user.stripeCustomerId,
            line_items:[

                {
                    price:priceId,
                    quantity:1
                }

            ],
            success_url:'http://localhost:5173/success',
            cancel_url:'http://localhost:5173/failure',
            payment_intent_data:{
                metadata:{
                    email:loggedInUser.emailId,
                    userId:String(loggedInUser._id),
                    memberShipType
                }
            }
        });

        return res.json({session_url:session.url});
    }

    catch(err){
        res.status(500).send({message:"failed to make payment session"});
    }


});

paymentRouter.get('/payment-verify',userAuth,(req,res)=>{

    const loggedInUser=req.user;

    const isPremium=loggedInUser.isPremium;

    return res.json({isPremium});

});

paymentRouter.post('/webhook',async (req,res)=>{

    const signature=req.headers['stripe-signature'];
    const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try{

        event=stripeClient.webhooks.constructEvent(
           req.rawBody,
            signature,
            webhookSecret
        );

        switch(event.type){
            case 'payment_intent.succeeded':{

                const stripeCustomerId=event.data.object.customer;

                const user=await User.findOne({stripeCustomerId});

                user.isPremium=true;

                if(event.data.object.metadata.memberShipType==='Gold'){
                    const expiryDate=addMonths(new Date(),6);;
                    user.premiumExpiredAt=expiryDate;
                }
                if(event.data.object.metadata.memberShipType==='Silver'){
                    const expiryDate=addMonths(new Date(),3);;
                    user.premiumExpiredAt=expiryDate;
                }

                await user.save();
                
            }
        }

    }
    catch(err){
        console.log(err);
       return res.status(500).json({message:'failed to construct event'});

    }

    return res.send('webhook received');

});

module.exports=paymentRouter;