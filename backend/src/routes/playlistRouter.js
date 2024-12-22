const express = require("express");
const axios = require("axios");
const router = express.Router();
const { makeSpotifyRequest, getUserIdFromToken } = require("../utils/auth");
require("dotenv").config();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
  process.env;
let accessToken = "";

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;
};

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

router.use(async (req, res, next) => {
  if (!accessToken) {
    await getAccessToken();
  }
  spotifyApi.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  next();
});

// Fetch user's playlists
router.get("/", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ error: "Access token missing" });
  }

  try {
    const userId = await getUserIdFromToken(accessToken);
    const playlists = await makeSpotifyRequest(userId, "/me/playlists");
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

router.post("/add-track", async (req, res) => {
  const { playlistId, trackUri, token } = req.body;

  if (!playlistId || !trackUri || !token) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Fetch the current tracks in the playlist
    const currentTracksResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const currentTrackUris = currentTracksResponse.data.items.map(
      (item) => item.track.uri
    );

    // Check if the track is already in the playlist
    if (currentTrackUris.includes(trackUri)) {
      return res.status(400).json({ error: "Track already in playlist" });
    }

    // If track is not in the playlist, proceed to add it
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: [trackUri] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ message: "Track added successfully" });
  } catch (error) {
    console.error(
      "Error adding track to playlist:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to add track to playlist" });
  }
});

// Change Playlist Details
router.put("/playlists/:id", async (req, res) => {
  try {
    const response = await spotifyApi.put(
      `/playlists/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Playlist Items
router.get("/playlists/:id/tracks", async (req, res) => {
  try {
    const response = await spotifyApi.get(`/playlists/${req.params.id}/tracks`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Playlist Items
router.put("/playlists/:id/tracks", async (req, res) => {
  try {
    const response = await spotifyApi.put(
      `/playlists/${req.params.id}/tracks`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Items to Playlist
router.post("/playlists/:id/tracks", async (req, res) => {
  try {
    const response = await spotifyApi.post(
      `/playlists/${req.params.id}/tracks`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove Playlist Items
router.delete("/playlists/:id/tracks", async (req, res) => {
  try {
    const response = await spotifyApi.delete(
      `/playlists/${req.params.id}/tracks`,
      { data: req.body }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Current User's Playlists
router.get("/me/playlists", async (req, res) => {
  try {
    const response = await spotifyApi.get("/me/playlists");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User's Playlists
router.get("/users/:user_id/playlists", async (req, res) => {
  try {
    const response = await spotifyApi.get(
      `/users/${req.params.user_id}/playlists`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Playlist
router.post("/users/:user_id/playlists", async (req, res) => {
  try {
    const response = await spotifyApi.post(
      `/users/${req.params.user_id}/playlists`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Playlist
router.delete("/playlists/:id", async (req, res) => {
  try {
    const response = await spotifyApi.delete(`/playlists/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Featured Playlists
router.get("/browse/featured-playlists", async (req, res) => {
  try {
    const response = await spotifyApi.get("/browse/featured-playlists");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Category's Playlists
router.get("/browse/categories/:category_id/playlists", async (req, res) => {
  try {
    const response = await spotifyApi.get(
      `/browse/categories/${req.params.category_id}/playlists`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Playlist Cover Image
router.get("/playlists/:id/images", async (req, res) => {
  try {
    const response = await spotifyApi.get(`/playlists/${req.params.id}/images`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Custom Playlist Cover Image
router.put("/playlists/:id/images", async (req, res) => {
  try {
    const response = await spotifyApi.put(
      `/playlists/${req.params.id}/images`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
