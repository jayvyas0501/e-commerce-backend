import express from "express"
import { changeAccountpref } from "../controller/vendor.controller.js"

const router = express.Router()

router.post("/chaneg-account-pref",changeAccountpref)

export default router