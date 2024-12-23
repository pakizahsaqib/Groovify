// middleware/authMiddleware.js

const { Token } = require("../../database/dbConnection");

const getAccessToken = async (userId) => {
  const tokenRecord = await Token.findOne({ where: { userId } });
  return tokenRecord ? tokenRecord.accessToken : null;
};

// Middleware function to check and refresh access token if needed
const checkAccessToken = async (req, res, next) => {
  const userId = req.query.userId; // Assuming user ID is passed in the query params

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const accessToken = await getAccessToken(userId);

  if (!accessToken) {
    return res
      .status(401)
      .json({ error: "Access token required. Please log in first." });
  }

  // If token is found, attach it to the request object for further use
  req.accessToken = accessToken;

  // Call the next middleware or route handler
  next();
};

// Export the middleware
module.exports = { checkAccessToken, getAccessToken };
