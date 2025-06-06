import { wrapAsync } from "../utils/wrapAsync.js";
import logger from "../utils/logger.js";
import userModel from "../model/user.model.js";
import productModel from "../model/product.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { cloudinaryQueue } from "../queues/email.queue.js";

export const changeAccountpref = wrapAsync(async (req, res) => {
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
});

export const createProduct = wrapAsync(async (req, res) => {
  const { title, category, price, description, stock } = req.body;


  const cloudinaryData = req.files.map(file => ({
    url: file.path,
    public_id: file.filename
  }));

  const vendor = req.user._id;

  const product = await productModel.create({
    vendor,
    title,
    category,
    price,
    description,
    stock,
    images: cloudinaryData, 
  });

  logger.info(
    `Product created by: ${req.user.name}, Product: ${product.title}`
  );

  res.status(201).json({
    success: true,
    message: "Product added successfully!",
    productId: product._id,
  });
});


export const updateProduct = wrapAsync(async (req, res) => {

  const product = await productModel.findById(req.params.id);

  if(!product){
    res.status(404).json({success:false, message:"Product Not Found"})
  }

  if (req.files && req.files.length > 0) {
    const publicIds = product.images.map((img)=> img.public_id)
    await cloudinaryQueue.add("deleteImage",{
      public_ids:publicIds
    })
  }

  const cloudData = req.files.map((file)=>({
    url: file.path,
    public_id: file.filename
  }))

  product.images = cloudData

  const { title, category, price, description, stock } = req.body;

  product.title = title  || product.title
  product.category = category  || product.category
  product.price = price || product.price
  product.description = description || product.description
  product.stock = stock || product.stock
  
  const updatedProduct = await product.save();

  logger.info(
    `Product updated by: ${req.user.name}, Product: ${updatedProduct.title}`
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully!",
    product: updatedProduct,
  });
});

export const deleteProduct = wrapAsync(async (req, res) => {
  
  const product = await productModel.findById(req.params.id)

   if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  if(product.images && product.images.length > 0){
    const publicIds = product.images.map((img)=>img.public_id)
  
    await cloudinaryQueue.add("deleteImage",{
      public_ids: publicIds,
    });

  }

  await product.deleteOne();

  logger.info(
    `Product deleted by: ${req.user.name}, Product: ${product.title}`//
  );

  res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
  });
});
