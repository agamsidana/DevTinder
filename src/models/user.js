const validator=require('validator');
const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minlength:3,
        maxlength:50,
        required:true,
    },

    lastName:{
        type:String,
        minlength:3,
        maxlength:15
    },

    emailId:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email address: '+ value);
            }
        }
    },

    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Please enter a strong passoword: '+ value);
            }
        }
    },

    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error('please enter a valid gender');
            }
        }
    },

    age:{
        type:Number,
        min:18,
    },

    skills:{
        type:[String]
    },

    about:{
        type:String

    },

    photo_url:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg',
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Please enter a valid photo URL: '+ value);
            }
        }
    }
},{
    timestamps:true
});

module.exports=mongoose.model('user',userSchema);