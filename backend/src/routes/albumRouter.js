const express = require("express");
const axios = require("axios");
const { getSpotifyAccessToken } = require("../utils/auth");

const router = express.Router();

router.get("/artist/:id", async (req, res) => {
  try {
    const token = await getSpotifyAccessToken();
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
});

module.exports = router;
