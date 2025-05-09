import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/ConnectDB.js"; 
import AuthRoute from "./src/routes/auth.route.js"
import AdminRoute from "./src/routes/admin.route.js"
import VendorRoute from "./src/routes/vendor.route.js"
import UserRoute from "./src/routes/user.route.js"
import cookieParser from "cookie-parser";
import { checkRole } from "./src/middleware/checkRole.middleware.js";
import { protect } from "./src/middleware/protect.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); 
app.use(urlencoded({extended:true}))
app.use(cookieParser())

// route
app.use("/api/auth",AuthRoute)
app.use("/api/admin",protect,checkRole("admin"),AdminRoute)
app.use("/api/vendor",protect,checkRole("vendor","admin"),VendorRoute)
app.use("/api/user",UserRoute)

//error handler
app.use((err,req,res,next) => {
  console.log("Error :",err.stack);
  res.status(500).json({
    success:false,
    message: err.message || "Something went wrong!"
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
