// const express = require("express");
// const axios = require("axios");
// const { getValidAccessToken } = require("../utils/auth");
// const { Artist } = require("../../database/dbConnection");

// const router = express.Router();
// router.get("/", async (req, res) => {
//   const { userId, artistIds } = req.query;

//   if (!userId || !artistIds) {
//     return res.status(400).json({ error: "Missing userId or artistIds." });
//   }
//   const artistIdsArray = artistIds.split(",");

//   if (artistIdsArray.length === 0) {
//     return res
//       .status(400)
//       .json({ error: "artistIds must be a non-empty array." });
//   }

//   try {
//     const token = await getValidAccessToken(userId);
//     const response = await axios.get("https://api.spotify.com/v1/artists", {
//       params: { ids: artistIdsArray.join(",") },
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const artistsData = response.data.artists;
//     const savedArtists = await Promise.all(
//       artistsData.map(async (artistData) => {
//         const artist = await Artist.create({
//           id: artistData.id,
//           name: artistData.name,
//           popularity: artistData.popularity,
//           genres: artistData.genres,
//           spotifyUrl: artistData.external_urls.spotify,
//           imageUrl: artistData.images[0]?.url,
//           followers: {
//             href: artistData.followers.href,
//             total: artistData.followers.total,
//           },
//           externalUrl: artistData.external_urls.spotify,
//           type: artistData.type,
//         });

//         return {
//           message: `Artist ${artistData.name} fetched and saved successfully!`,
//           artist,
//         };
//       })
//     );
//     res.json(savedArtists);
//   } catch (error) {
//     console.error("Error fetching artists data:", error.message || error);
//     res.status(500).json({ error: "Failed to fetch and save artists' data" });
//   }
// });

// module.exports = router;
const express = require("express");
const axios = require("axios");
const { getValidAccessToken } = require("../utils/auth");
const { Artist } = require("../../database/dbConnection");

const router = express.Router();

// Fetch multiple artists and save them in the database
router.get("/", async (req, res) => {
  try {
    const allArtists = await Artist.findAll(); // Fetch all documents in the Artist collection
    // console.log("All Artists from DB:", allArtists);

    // Return all artists from the database in the response
    res.json(allArtists);
  } catch (error) {
    console.error("Error fetching artists data:", error.message || error);
    res.status(500).json({ error: "Failed to fetch artists' data" });
  }
});

// router.get("/", async (req, res) => {
//   const { userId, artistIds } = req.query;
//   console.log("Artist IDs:", artistIds);
//   console.log("User ID:", userId);

//   if (!userId || !artistIds) {
//     return res.status(400).json({ error: "Missing userId or artistIds." });
//   }
//   const artistIdsArray = artistIds.split(",");
//   console.log("Artists:", artistIdsArray);

//   if (artistIdsArray.length === 0) {
//     return res
//       .status(400)
//       .json({ error: "artistIds must be a non-empty array." });
//   }

//   try {
//     const token = await getValidAccessToken(userId);
//     const response = await axios.get("https://api.spotify.com/v1/artists", {
//       params: { ids: artistIdsArray.join(",") },
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const artistsData = response.data.artists;
//     console.log(artistsData);
//     // const savedArtists = await Promise.all(
//     //   artistsData.map(async (artistData) => {
//     //     const artist = await Artist.create({
//     //       id: artistData.id,
//     //       name: artistData.name,
//     //       popularity: artistData.popularity,
//     //       genres: artistData.genres,
//     //       spotifyUrl: artistData.external_urls.spotify,
//     //       imageUrl: artistData.images[0]?.url,
//     //       followers: {
//     //         href: artistData.followers.href,
//     //         total: artistData.followers.total,
//     //       },
//     //       externalUrl: artistData.external_urls.spotify,
//     //       type: artistData.type,
//     //     });

//     //     return {
//     //       message: `Artist ${artistData.name} fetched and saved successfully!`,
//     //       artist,
//     //     };
//     //   })
//     // );
//     // console.log("savedArtist", savedArtists);
//     res.json(artistsData);
//   } catch (error) {
//     console.error("Error fetching artists data:", error.message || error);
//     res.status(500).json({ error: "Failed to fetch and save artists' data" });
//   }
// });

// Fetch a single artist's data
router.get("/:id", async (req, res) => {
  console.log("Request Received from front end");
  const { id } = req.params;
  const { userId } = req.query;
  console.log(
    `Request Received from front end with actors id ${id} and UserID ${userId}`
  );
  if (!userId) {
    return res.status(400).json({ error: "Missing userId." });
  }

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching artist data:", error.message || error);
    res.status(500).json({ error: "Failed to fetch artist data" });
  }
});

// Fetch an artist's albums
router.get("/:id/albums", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId." });
  }

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching artist's albums:", error.message || error);
    res.status(500).json({ error: "Failed to fetch artist's albums" });
  }
});

// Fetch an artist's top tracks
router.get("/:id/top-tracks", async (req, res) => {
  const { id } = req.params;
  const { userId, market = "US" } = req.query;
  console.log(
    `Request Received from front end with actors id ${id} and UserID ${userId}`
  );
  if (!userId) {
    return res.status(400).json({ error: "Missing userId." });
  }

  try {
    const token = await getValidAccessToken(userId);
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching artist's top tracks:",
      error.message || error
    );
    res.status(500).json({ error: "Failed to fetch artist's top tracks" });
  }
});

module.exports = router;
