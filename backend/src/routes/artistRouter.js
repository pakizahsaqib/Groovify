const express = require("express");
const axios = require("axios");
const { getSpotifyAccessToken } = require("../utils/auth");

const router = express.Router();

// Fetch Artist Details
router.get("/:id", async (req, res) => {
  try {
    const token = await getSpotifyAccessToken();
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch artist data" });
  }
});

module.exports = router;
