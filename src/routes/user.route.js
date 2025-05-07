import express from "express"
import { createProfile, getProfile, updateProfile } from "../controller/user.controller.js"
import { protect } from "../middleware/protect.js"
import { profileValidator } from "../validator/profile.validator.js"
import validate from "../middleware/validate.middleware.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.post("/profile",protect,validate(profileValidator),createProfile)

router.get("/profile/:id",getProfile)

router.patch("/profile/:id",upload.single('avatar'),protect,updateProfile)

export default router