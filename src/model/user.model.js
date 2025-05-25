import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlenght: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "vendor", "admin"],
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
