const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token") || req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Remove Bearer if present
    const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    // Verify token
    const decoded = jwt.verify(tokenString, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}; 