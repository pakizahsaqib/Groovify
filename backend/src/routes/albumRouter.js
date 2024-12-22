const express = require("express");
const axios = require("axios");
const { getValidAccessToken } = require("../utils/auth"); // Assume getValidAccessToken is in auth.js
const router = express.Router();

// Get a single album by its ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching album:", error.message || error);
    res.status(500).json({ error: "Failed to fetch album data" });
  }
});

// Get several albums by their IDs
router.get("/albums", async (req, res) => {
  const { ids } = req.query; // comma-separated list of album IDs
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  if (!ids) return res.status(400).json({ error: "Missing album IDs." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(`https://api.spotify.com/v1/albums`, {
      params: { ids },
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching albums:", error.message || error);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
});

// Get album tracks by album ID
router.get("/:id/tracks", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching album tracks:", error.message || error);
    res.status(500).json({ error: "Failed to fetch album tracks" });
  }
});

// Get the current user's saved albums
router.get("/me/albums", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(`https://api.spotify.com/v1/me/albums`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching user's saved albums:",
      error.message || error
    );
    res.status(500).json({ error: "Failed to fetch user's saved albums" });
  }
});

// Save an album for the current user
router.post("/me/albums", async (req, res) => {
  const { ids } = req.body; // Array of album IDs to save
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  if (!Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ error: "No album IDs provided." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.put(
      `https://api.spotify.com/v1/me/albums`,
      { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error saving albums:", error.message || error);
    res.status(500).json({ error: "Failed to save albums" });
  }
});

// Remove albums for the current user
router.delete("/me/albums", async (req, res) => {
  const { ids } = req.body; // Array of album IDs to remove
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  if (!Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ error: "No album IDs provided." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/albums`,
      { data: { ids }, headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error removing albums:", error.message || error);
    res.status(500).json({ error: "Failed to remove albums" });
  }
});

// Check if albums are saved for the current user
router.get("/me/albums/contains", async (req, res) => {
  const { ids } = req.query; // Comma-separated list of album IDs
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  if (!ids) return res.status(400).json({ error: "No album IDs provided." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      `https://api.spotify.com/v1/me/albums/contains`,
      {
        params: { ids },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error checking if albums are saved:",
      error.message || error
    );
    res.status(500).json({ error: "Failed to check if albums are saved" });
  }
});

// Get new album releases
router.get("/new-releases", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId." });

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/new-releases`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching new releases:", error.message || error);
    res.status(500).json({ error: "Failed to fetch new releases" });
  }
});

module.exports = router;
