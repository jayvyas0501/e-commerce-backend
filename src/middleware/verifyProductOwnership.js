import productModel from "../model/product.model.js";


export const verifyProductOwnership = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    req.product = product;

    next();
  } catch (err) {
    console.error("Ownership check error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
