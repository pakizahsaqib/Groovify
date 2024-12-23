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

    if (currentTrackUris.includes(trackUri)) {
      return res.status(400).json({ error: "Track already in playlist" });
    }

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

router.delete("/remove-track", async (req, res) => {
  const { playlistId, trackUri, accessToken } = req.body;
  if (!playlistId || !trackUri || !accessToken) {
    return res.status(400).json({
      error: "Missing required fields: playlistId, trackUri, or accessToken",
    });
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracks: [{ uri: trackUri }],
        }),
      }
    );

    if (response.ok) {
      return res
        .status(200)
        .json({ message: "Track removed from playlist successfully" });
    } else {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ error: errorData.error.message });
    }
  } catch (error) {
    console.error("Error removing track:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while removing the track" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Error deleting playlist" });
  }
});
//...No used
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

module.exports = router;
