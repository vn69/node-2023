import jwt from "jsonwebtoken"
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("decode::::: ",decode);
    req.user = decode.user;
    next();
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role
    // console.log("roles::::",{userRole, roles})
    const isAdmin = roles.includes(userRole)
    // console.log(isAdmin);
    if(isAdmin) {
      next()
    } else {
      res.status(400).json({
        success: false,
        message: "you are not allowed to access this"
      })
    }
  }
};
