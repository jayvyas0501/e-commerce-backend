import logger from "./logger.js"; 


const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.message} - IP: ${req.ip}`);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
