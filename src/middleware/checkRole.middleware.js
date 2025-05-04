export const checkRole = (...allowedRoles) => {
    return (req,res,next) => {
        try {
          if(allowedRoles.includes(req.user.role)){
              return next()
          }
          res.status(500).json({
              message: "You are not authorized to access this resources!",
              success: false,
            });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: "Internal server error while cheking role!",
            success: false,
          });
        }
      };
    }
