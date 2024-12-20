const express = require("express");
const axios = require("axios");
const { getValidAccessToken } = require("../utils/auth"); // Utility function for tokens
const { FeaturedPlaylist } = require("../../database/dbConnection");

const router = express.Router();

// Route to fetch and store Featured Playlists
router.get("/playlists", async (req, res) => {
  try {
    // Step 1: Get a valid Spotify access token
    const token = await getValidAccessToken(req.query.userId); // Passing userId for token validation
    if (!token) {
      throw new Error("Failed to fetch a valid Spotify access token.");
    }

    // Step 2: Make API call to Spotify for featured playlists
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const playlists = response.data.playlists?.items || [];
    if (playlists.length === 0) {
      return res.status(404).json({ message: "No featured playlists found." });
    }

    // Step 3: Prepare bulk data for database insertion
    const bulkInsertData = playlists.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description || "",
      spotifyUrl: playlist.external_urls?.spotify || "",
      imageUrl: playlist.images[0]?.url || "",
      ownerId: playlist.owner?.id || "",
      ownerName: playlist.owner?.display_name || "",
      ownerSpotifyUrl: playlist.owner?.external_urls?.spotify || "",
      followers: playlist.owner?.followers?.total || 0,
      tracksCount: playlist.tracks?.total || 0,
    }));

    // Step 4: Save playlists to the database
    await FeaturedPlaylist.bulkCreate(bulkInsertData, {
      updateOnDuplicate: [
        "name",
        "description",
        "spotifyUrl",
        "imageUrl",
        "ownerId",
        "ownerName",
        "ownerSpotifyUrl",
        "followers",
        "tracksCount",
      ],
    });

    // Step 5: Respond with success and data
    res.status(200).json({
      message: "Featured playlists fetched and stored successfully.",
      data: bulkInsertData,
    });
  } catch (error) {
    console.error("Error fetching or storing featured playlists:", error);

    // Handle specific errors from Spotify API
    if (error.response) {
      return res.status(error.response.status).json({
        error:
          error.response.data.error || "Error fetching playlists from Spotify",
      });
    }

    // Handle generic errors
    res.status(500).json({
      error: error.message || "An unknown error occurred.",
    });
  }
});

module.exports = router;
