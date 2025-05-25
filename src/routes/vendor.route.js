import express from "express"
import { changeAccountpref, createProduct, deleteProduct, updateProduct } from "../controller/vendor.controller.js"
import { protect } from "../middleware/protect.js"
import productUpload from "../middleware/productUpload.js"
import { verifyProductOwnership } from "../middleware/verifyProductOwnership.js"

const router = express.Router()

router.post("/chaneg-account-pref",changeAccountpref)

router.post("/product", protect,verifyProductOwnership,productUpload.array("images",5),createProduct)

router.put("/product/:id",protect,verifyProductOwnership,productUpload.array("images",5),updateProduct)

router.delete("/product/:id",protect,deleteProduct)

export default router