import express from "express"
import { login, signup, verifyEmail } from "../controller/auth.controller.js"
import { registerValidator } from "../validator/user.validator.js"
import validate from "../middleware/validate.middleware.js"

const router = express.Router()

router.post("/signup",validate(registerValidator),signup)
router.post("/verify",verifyEmail)
router.post("/login",login)


export default router