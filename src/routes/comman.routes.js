import express from "express";
import { getAllProducts, getProductById } from "../controller/product.controller.js";

const router = express.Router()

router.get("/products",getAllProducts)

router.get("/products/:id",getProductById)

export default router