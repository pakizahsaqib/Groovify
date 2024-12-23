const express = require("express");
const router = express.Router();
const { getUserIdFromToken, makeSpotifyRequest } = require("../utils/auth");

// Route: GET /search
//FLOW
// Step 1: Validate Request
// Step 2: Get User ID from Token
// Step 3: Construct Spotify API Endpoint
// Step 4: Fetch Data from Spotify
// Step 5: Send Response to Client

router.get("/", async (req, res) => {
  try {
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
    const userId = await getUserIdFromToken(token);
    const endpoint = `/search?q=${encodeURIComponent(query)}&type=${type}`;
    const spotifyData = await makeSpotifyRequest(userId, endpoint);

    res.json(spotifyData);
  } catch (error) {
    console.error("Error in /search route:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
