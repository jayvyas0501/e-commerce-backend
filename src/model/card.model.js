import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required:true
            },
            quantity:{
                type:Number,
                min:1,
                default:1
            }
        }
    ],
    totalPrice:{
        type:Number,
        default:0
    }
},{timestamps: true})

export default mongoose.model("Cart",cartSchema)