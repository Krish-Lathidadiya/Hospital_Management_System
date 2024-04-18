const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');

//admin login?
const isAdminAuthenticated = async (req, res, next) => {
    try {

        //token available
        const token = req.cookies.adminToken; 
        if (!token) {
            const customError = {
                status: 400,
                message: "Admin not authenticated"
            };
            return next(customError); 
        }

        //token verfiy
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            const customError = {
                status: 400,
                message: "Invalid token"
            };
            return next(customError); 
        }

        //check admin role 
        req.user = await User.findById(decoded.userId);
        if (!req.user || req.user.role !== 'Admin') {
            const customError = {
                status: 400,
                message: `${req.user ? req.user.role : 'User'} not authenticated for this process`
            };
            return next(customError);
        }

        next()
    } catch (error) {
        console.error("Error in isAdminAuthenticated:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



const isPatientAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }
  const jwtToken=token.replace("Bearer","").trim();
  console.log("token from the auth middleware",jwtToken);

  try {
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY); // Replace 'your-secret-key' with your actual JWT secret
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};




module.exports ={ isAdminAuthenticated,isPatientAuthenticated}
