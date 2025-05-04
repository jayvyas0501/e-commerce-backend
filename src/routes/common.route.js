import express from "express"
import { getProfile } from "../controller/user.controller.js"

const router = express.Router()

router.get("/profile",getProfile)

export default router