import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: [{
    type: String,
    required: true,
  }],
  stock: {
    type: Number,
    default: 0,
  },
  inStock:{
    type:Boolean,
    default: true
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  profitMargin:{
    type: Number,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.index({ title: "text", description: "text" }); // for full-text search
productSchema.index({ price: 1 });
productSchema.index({ rating: 1 });
productSchema.index({ inStock: 1 });
productSchema.index({ category: 1 });

export default mongoose.model("Product", productSchema);
