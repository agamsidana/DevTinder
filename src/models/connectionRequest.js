const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
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

connectionRequestSchema.pre('save',function(){
    const connectionRequest=this;
    // check if toUserId is equalto fromUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('you cannot send request to yourself');
    }
});


const ConnectionRequestModel=new mongoose.model('connectionRequest',connectionRequestSchema);

module.exports=ConnectionRequestModel;