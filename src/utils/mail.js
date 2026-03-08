require('dotenv').config();
const nodemailer=require('nodemailer');


const transporter=nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:Number(process.env.MAIL_PORT),
    secure:false,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }
});

async function sendMail(toMail,subject,body){
    try{
        await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:toMail,
            subject:subject,
            text:body
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports={sendMail}

