const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticateJWT;
