import logger from "../utils/logger.js";

export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (allowedRoles.includes(req.user.role)) {
        return next();
      }
      res.status(500).json({
        message: "You are not authorized to access this resources!",
        success: false,
      });
    } catch (error) {
      logger.error(`Role check error: ${error.message}`);
      res.status(500).json({
        message: "Internal server error while checking role!",
        success: false,
      });
    }
  };
};
