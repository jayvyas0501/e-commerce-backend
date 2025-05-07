
import mongoose from "mongoose"

const profileSchema = mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    phone:{
        type:String,
        trim:true
    },
    avatar:{
        type:String,
        default:""
    },
    avatarPublicId: {
        type: String,
        default: "",
      },
    address:{
        street:String,
        city:String,
        state:String, 
        postalCode:Number,
        country:String
    },
    dateOfBirth:Date,
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Profile",profileSchema)