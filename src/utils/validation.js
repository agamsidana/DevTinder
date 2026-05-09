const validator = require('validator')


function validateSignup(req){
    const {firstName,lastName,emailId,password,age,gender,about}=req.body;

    if(!firstName || !lastName ){
        throw new Error("firstName and lastName is required");
    }

    else if(!age){
        throw new Error('age is required');
    }

    else if(!gender){
        throw new Error('gender is required');
    }

    else if(!about){
        throw new Error('about is required');
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