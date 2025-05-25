import { wrapAsync } from "../utils/wrapAsync.js";
import logger from "../utils/logger.js";
import userModel from "../model/user.model.js";
import productModel from "../model/product.model.js";


export const changeAccountpref = wrapAsync(
  async (req, res) => {
    const { userId } = req.body;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { role: "user" },
      { new: true }
    );

    if (!user) {
      logger.warn(`User not found during role change: ID ${userId}`);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    logger.info(`Role changed to 'user' for user ID: ${userId}`);

    res.status(201).json({
      success: true,
      message: "You are a normal user now!",
    });
  }
);

export const createProduct = wrapAsync(
  async (req, res) => {
    const { title, category, price, description, stock, images } = req.body;

    const vendor = req.user._id

    const product = await productModel.create({
      vendor,
      title,
      category,
      price,
      description,
      stock,
      images,
    });

    logger.info(`Product created by: ${req.user.name}, Product: ${product.title}`);

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      productId: product._id,
    });
  }
);


export const updateProduct = wrapAsync(
  async (req, res) => {
    
    const product = Object.assign(req.product,req.body)
    const updatedProduct = await product.save()

    logger.info(`Product updated by: ${req.user.name}, Product: ${updatedProduct.title}`);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  }
);


export const deleteProduct = wrapAsync(
  async (req, res) => {
    await req.product.deleteOne();

    logger.info(`Product deleted by: ${req.user.name}, Product: ${req.product.title}`);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  }
); 
