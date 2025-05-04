import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/ConnectDB.js"; 
import AuthRoute from "./src/routes/auth.route.js"
import AdminRoute from "./src/routes/admin.route.js"
import VendorRoute from "./src/routes/vendor.route.js"
import CommonRoute from "./src/routes/common.route.js"
import cookieParser from "cookie-parser";
import { checkRole } from "./src/middleware/checkRole.middleware.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); 
app.use(cookieParser())

// route
app.use("/api/auth",AuthRoute)
app.use("/api/admin",checkRole("admin"),AdminRoute)
app.use("/api/vendor",VendorRoute)
app.use("/api/user",CommonRoute)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
