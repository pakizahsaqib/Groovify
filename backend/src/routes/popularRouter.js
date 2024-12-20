const express = require("express");
const { Album } = require("../../database/dbConnection");
const { getValidAccessToken } = require("../utils/auth");
const axios = require("axios");

const router = express.Router();

router.get("/new-releases/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const albums = response.data.albums.items;
    for (const album of albums) {
      const imageUrl = album.images[0]?.url || "";
      const primaryArtist = album.artists[0];

      await Album.upsert({
        id: album.id,
        album_type: album.album_type,
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        type: album.type,
        uri: album.uri,
        image_url: imageUrl,
        artist_name: primaryArtist.name,
        artist_uri: primaryArtist.uri,
      });
    }

    res.json({ message: "New releases fetched and saved successfully!" });
  } catch (error) {
    console.error("Error fetching new releases:", error.message);
    res.status(500).json({ error: "Failed to fetch new releases." });
  }
});

module.exports = router;
