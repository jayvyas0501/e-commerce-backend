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
import { globalLimiter } from "./src/middleware/rateLimiter.js";
// import ExpressMongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean"
import compression from "compression";
import helmet from "helmet";
import { morganMiddleware } from "./src/middleware/morgan.middleware.js";
import logger from "./src/utils/logger.js";
import errorHandler from "./src/utils/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Connect to MongoDB
connectDB();

// Middleware
app.use(morganMiddleware);
app.use(express.json()); 
app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(compression())
// app.use(ExpressMongoSanitize())
// app.use(xss())
app.use(helmet())

// Apply global limiter to all routes
app.use(globalLimiter);

// route
app.use("/api/auth",AuthRoute)
app.use("/api/admin",protect,checkRole("admin"),AdminRoute)
app.use("/api/vendor",protect,checkRole("vendor","admin"),VendorRoute)
app.use("/api/user",UserRoute)

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
