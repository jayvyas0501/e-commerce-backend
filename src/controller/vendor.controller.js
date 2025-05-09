import { wrapAsync } from "../utils/wrapAsync.js";

export const changeAccountpref = wrapAsync(
    async (req,res) => {
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
        message: "Your are normal user now!",
      });
})