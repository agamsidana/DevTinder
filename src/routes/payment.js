const express=require('express');
const { userAuth } = require('../middlewares/userauth');

const paymentRouter=express.Router();
const stripeClient=require('../utils/stripe');

const User=require('../models/user')

const {memberShipPriceId}=require('../utils/constants');

paymentRouter.post('/create-order',userAuth,async (req,res)=>{

    const memberShipType=req.body?.memberShipType;


    if(!memberShipType){
        return res.status(400).json({message:'memberShipType is required'});
    }

    const loggedInUser=req.user;

    //stripe customer creation

    const user=await User.findById(loggedInUser._id);
    

    //only create customer on stripe when user is new or have no stripeCustomerId is DB;
    if(!user.stripeCustomeId){

        const customer=await stripeClient.customers.create({email:loggedInUser.email});

        const customerId=customer.id;

        user.stripeCustomeId=customerId;

        await user.save();

    }

    const priceId=memberShipType==='Silver' ? memberShipPriceId.silver : memberShipPriceId.gold;

  
    try{

        const session=await stripeClient.checkout.sessions.create({
            mode:'payment',
            customer:user.stripeCustomeId,
            line_items:[

                {
                    price:priceId,
                    quantity:1
                }

            ],
            success_url:'https://www.google.com',
            metadata:{
                email:loggedInUser.emailId,
                userId:String(loggedInUser._id)
            }
        });

        return res.json({session_url:session.url});
    }

    catch(err){
        res.status(500).send({message:"failed to make payment session"});
    }


});

module.exports=paymentRouter;