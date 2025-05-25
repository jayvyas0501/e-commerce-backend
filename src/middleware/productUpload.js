import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const productStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "products",
        allowed_formats: ["jpg","jpeg","png"],
        transformation:[{width:800,heihgt:800,crop:"limit"}]
    }
})

const productUpload = multer({storage:productStorage})

export default productUpload