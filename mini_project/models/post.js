const mongoose=require("mongoose");


const postSchema=mongoose.Schema({
    // this will store the ObjectId of the user who created this post
    // "ref" tells mongoose which model to use when populating this field
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    dat:{
        type:Date,
        default:Date.now
    },
    content:String,
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]
    
});

module.exports=mongoose.model("post",postSchema);