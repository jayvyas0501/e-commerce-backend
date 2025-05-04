import express from "express"
import { login, signup } from "../controller/auth.controller.js"
import { registerValidator } from "../validator/user.validator.js"
import validate from "../middleware/validate.middleware.js"

const router = express.Router()

router.post("/signup",validate(registerValidator),signup)
router.post("/login",login)


export default router