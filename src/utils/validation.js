const validator = require('validator')


function validateSignup(req){
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName || !lastName ){
        throw new Error("firstName and lastName is required");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error('Email is Invalid');
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error('Please Enter a Strong Password');
    }

}

function validateEditProfileData(req){
    const AllowedFields=['firstName','lastName','skills','about','age','gender','photo_url'];

    const isEditAllowed=Object.keys(req.body).every((field)=>AllowedFields.includes(field));

    return isEditAllowed;
} 

module.exports={
    validateSignup,
    validateEditProfileData
}