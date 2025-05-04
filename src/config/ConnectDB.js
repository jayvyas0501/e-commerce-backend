import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};
