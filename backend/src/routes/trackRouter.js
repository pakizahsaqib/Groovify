const express = require("express");
const { Track } = require("../../database/dbConnection");
const { makeSpotifyRequest } = require("../utils/auth");
const router = express.Router();

router.get("/fetch", async (req, res) => {
  const { artistId, market = "US", userId } = req.query;
  if (!artistId) {
    return res.status(400).json({ message: "Artist ID is required." });
  }

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const endpoint = `/artists/${artistId}/top-tracks?market=${market}`;
    const responseData = await makeSpotifyRequest(userId, endpoint);

    const { tracks } = responseData;

    if (!tracks || tracks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tracks found for the artist." });
    }
    const trackPromises = tracks.map((track) => {
      const trackData = {
        trackId: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url || "",
        popularity: track.popularity,
        spotifyUrl: track.external_urls.spotify,
        isPlayable: track.is_playable,
        durationMs: track.duration_ms,
        explicit: track.explicit,
      };
      return Track.upsert(trackData);
    });

    await Promise.all(trackPromises);

    res.status(200).json({ message: "Tracks saved successfully." });
  } catch (error) {
    console.error("Error fetching or saving tracks:", error);
    res.status(500).json({
      message: "Error fetching or saving tracks.",
      error: error.message,
    });
  }
});

module.exports = router;
