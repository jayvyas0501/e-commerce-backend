import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect("mongodb://localhost:27017/e-commerce",{autoIndex: true,});
    logger.info(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit the process if connection fails
  }
};
