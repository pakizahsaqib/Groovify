const express = require("express");
const router = express.Router();
const { getUserIdFromToken, makeSpotifyRequest } = require("../utils/auth");

// Route: GET /search
router.get("/", async (req, res) => {
  try {
    // Step 1: Validate Request
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid Authorization header" });
    }

    const { query, type = "artist" } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Step 2: Get User ID from Token
    const userId = await getUserIdFromToken(token);

    // Step 3: Construct Spotify API Endpoint
    const endpoint = `/search?q=${encodeURIComponent(query)}&type=${type}`;

    // Step 4: Fetch Data from Spotify
    const spotifyData = await makeSpotifyRequest(userId, endpoint);

    // Step 5: Send Response to Client
    res.json(spotifyData);
  } catch (error) {
    console.error("Error in /search route:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
