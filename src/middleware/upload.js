import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'avatar',
        allowed_formates: ['jpg','jpeg','png'],
        transformation: [{width:300,heigh:300,crop: 'limit'}]
    }
})

const upload = multer({storage})

export default upload