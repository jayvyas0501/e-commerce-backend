import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'avatar',
        allowed_formats: ['jpg','jpeg','png'],
        transformation: [{width:300,hieght:300,crop: 'limit'}]
    }
})

const upload = multer({storage})

export default upload