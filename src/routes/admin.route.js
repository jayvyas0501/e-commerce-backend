import express from "express"

import { getUser, getUsers } from "../controller/admin.controller.js"

const router = express.Router()

router.get("/get-users",getUsers)

router.get("/get-user/:id",getUser)

export default router