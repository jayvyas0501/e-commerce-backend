import userModel from "../model/user.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const getUsers = wrapAsync(async (req, res) => {
  const allUsers = await userModel.find();
  return res.status(200).json({
    message: "all users got!",
    success: true,
    data: allUsers,
  });
});

export const getUser = wrapAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  return res.status(200).json({
    message: "request user sent!",
    success: true,
    data: user,
  });
});

export const approveVendor = wrapAsync(async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (user.role === "vendor") {
    user.approve = true;
    await user.save();
  }
  res.status(201).json({
    success: true,
    message: "Your are vendor now welcome!",
  });
});

export const revokeRole = wrapAsync(async (req, res) => {
  const { userId } = req.body;

  const user = await userModel.findByIdAndUpdate(
    userId,
    { role: "user" },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(201).json({
    success: true,
    message: "Your role has been revoked by admin!",
  });
});
