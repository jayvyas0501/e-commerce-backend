import logger from "./logger.js"; 

// Centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  // Log the error
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.message} - IP: ${req.ip}`);

  // Handle specific known errors (extend as needed)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // helpful for dev, hidden in prod
  });
};

export default errorHandler;
