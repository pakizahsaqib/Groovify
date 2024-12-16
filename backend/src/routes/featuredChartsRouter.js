const express = require("express");
const axios = require("axios");
const { getSpotifyAccessToken } = require("../utils/auth");

const router = express.Router();

// Fetch Featured Playlists (Popular Charts)
router.get("/featured-playlists", async (req, res) => {
  try {
    const token = await getSpotifyAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data.playlists.items); // Return the featured playlists
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch featured playlists" });
  }
});

module.exports = router;
