const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user' // refrence to user collection
    },

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    status:{
        type:String,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:`{VALUE} is not of type status`
        }
    }
},{timestamps:true});

connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre('save',function(){
    const connectionRequest=this;
    // check if toUserId is equalto fromUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('you cannot send request to yourself');
    }
});


const ConnectionRequestModel=new mongoose.model('connectionRequest',connectionRequestSchema);

module.exports=ConnectionRequestModel;