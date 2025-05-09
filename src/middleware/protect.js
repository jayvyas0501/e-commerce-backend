import jwt from "jsonwebtoken"
import userModel from "../model/user.model.js"

export const protect = async (req,res,next) =>{
    try {
        const token = 
        req.cookies?.token ||
        req.headers.authorization?.replace("Bearer ","")

        if(!token){
            return res.status(401).json({
                message: "Not authorized, token missing",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user to request
        req.user = await userModel.findById(decoded.userId).select("-password");

        next(); // allow to proceed


    } catch (error) {
        console.log("Error :",error);
        
        return res.status(401).json({
            message: "Not authorized, token failed",
            success: false
          });
    }
}