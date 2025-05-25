
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default: 0
    },
    images:[
        {
        public_id:String,
        url:String
    }],
    rating:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export default mongoose.model("Product",productSchema)