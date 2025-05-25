import express from "express"
import { login, signup, verifyEmail } from "../controller/auth.controller.js"
import { registerValidator } from "../validator/user.validator.js"
import validate from "../middleware/validate.middleware.js"
import { loginLimiter } from "../middleware/rateLimiter.js"
import { loginSlowDown } from "../middleware/loginSlowdown.js"

const router = express.Router()

router.post("/signup",validate(registerValidator),signup)
router.post("/verify",verifyEmail)
router.post("/login",loginSlowDown,loginLimiter,login)


export default router