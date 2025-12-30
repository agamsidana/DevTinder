const validator=require('validator');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


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

userSchema.methods.getJWT=async function (){
    const user=this;
    const {_id}=user;

    const token = await jwt.sign({_id:_id},'agam@123',{expiresIn:'8h'});

    return token
    
}

userSchema.methods.comparePassword = async function(userInputPassword){
    const user=this;
    const hashedPassword=user.password;
    console.log(userInputPassword)
    const isPasswordValid=await bcrypt.compare(userInputPassword,hashedPassword);
    return isPasswordValid;

}




module.exports=mongoose.model('user',userSchema);