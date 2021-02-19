const jwt = require('jsonwebtoken');
const { User } = require('../db');

// Protect routes
const protect = async (req, res, next) => {
  try {
    // Initialize token
    let token;
    if (req.cookies.token) {
      // If the token is contained in cookie - set token to cookie
      token = req.cookies.token;
    }

    // Make sure token exists - if not send a 401 error
    if (!token) {
      return next(
        res.status(401).json({ data: 'Not authorized to access this route' })
      );
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Identify currently logged in user with token
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      return next(
        res.status(401).json({ data: 'Not authorized to access this route' })
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
