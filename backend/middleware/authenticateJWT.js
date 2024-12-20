const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Make sure to set this secret in your environment variables

// Middleware to authenticate the user using JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Add userId to the request object so it's available in subsequent routes
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticateJWT;
