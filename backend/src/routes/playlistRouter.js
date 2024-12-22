const express = require("express");
const router = express.Router();
const { makeSpotifyRequest, getUserIdFromToken } = require("../utils/auth");

router.get("/", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1]; // Extract token from 'Authorization' header

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

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { makeSpotifyRequest } = require("../utils/auth");
// const { Token } = require("../../database/dbConnection");

// router.get("/", async (req, res) => {
//   const userId = req.session.userId;

//   console.log("req.session.userId: ", req.session.userId);
//   console.log(userId);

//   if (!userId) {
//     return res.status(401).json({ error: "User not authenticated" });
//   }

//   try {
//     const tokenData = await Token.findOne({ where: { userId } });

//     if (!tokenData) {
//       return res.status(404).json({ error: "No token found for this user." });
//     }

//     const playlists = await makeSpotifyRequest(userId, "/me/playlists");
//     res.json(playlists);
//   } catch (error) {
//     console.error("Error fetching playlists:", error);
//     res.status(500).json({ error: "Failed to fetch playlists" });
//   }
// });

// module.exports = router;
