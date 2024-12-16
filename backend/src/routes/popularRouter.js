const express = require("express");
const axios = require("axios");
const { getSpotifyAccessToken } = require("../utils/auth");
const { Album } = require("../../database/dbConnection");

const router = express.Router();

router.get("/new-releases", async (req, res) => {
  try {
    const token = await getSpotifyAccessToken();

    // Fetch data from Spotify API
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const albums = response.data.albums.items;

    // Loop through the albums and save each to the database
    for (const album of albums) {
      const imageUrl = album.images[0]?.url || ""; // Fallback to empty string if no image

      // Extract artist details
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
    console.error("Error fetching new releases:", error);
    res.status(500).json({ error: "Failed to fetch new releases" });
  }
});

module.exports = router;
