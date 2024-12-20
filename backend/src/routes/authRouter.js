// const express = require("express");
// const axios = require("axios");
// const { Token } = require("../../database/dbConnection"); // Correct model import
// const router = express.Router();

// const crypto = require("crypto");

// const {
//   SPOTIFY_CLIENT_ID,
//   SPOTIFY_CLIENT_SECRET,
//   SPOTIFY_REDIRECT_URI,
//   FRONTEND_URL,
//   SCOPE,
// } = process.env;

// router.get("/login", (req, res) => {
//   const scope = SCOPE;
//   const state = crypto.randomBytes(16).toString("hex"); // Generate a random state
//   req.session.state = state;

//   const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=${scope}&state=${state}`;
//   res.redirect(authUrl);
// });
// router.get("/callback", async (req, res) => {
//   const code = req.query.code || null;
//   const state = req.query.state || null;

//   if (state !== req.session.state) {
//     return res
//       .status(400)
//       .json({ error: "State mismatch. Potential CSRF attack." });
//   }

//   if (!code) {
//     return res.status(400).json({ error: "Authorization code is required." });
//   }

//   try {
//     const urlParams = new URLSearchParams();
//     urlParams.append("grant_type", "authorization_code");
//     urlParams.append("code", code);
//     urlParams.append("redirect_uri", SPOTIFY_REDIRECT_URI);
//     urlParams.append("client_id", SPOTIFY_CLIENT_ID);
//     urlParams.append("client_secret", SPOTIFY_CLIENT_SECRET);

//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       urlParams, // Use encoded form data
//       {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       }
//     );

//     const { access_token, refresh_token } = response.data;
//     const userResponse = await axios.get("https://api.spotify.com/v1/me", {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });

//     const userProfile = userResponse.data;
//     req.session.userId = userProfile.id; // Store user ID in the session

//     // Check if the user already exists in the database, otherwise create a new record
//     const existingToken = await Token.findOne({ where: { userId: userId } });

//     if (existingToken) {
//       existingToken.accessToken = access_token;
//       existingToken.refreshToken = refresh_token;
//       await existingToken.save();

//       // Ensure the user exists or is updated
//       const user = await User.upsert({
//         id: userProfile.id,
//         displayName: userProfile.display_name,
//         email: userProfile.email,
//         profileImageUrl: userProfile.images[0]?.url || null,
//         spotifyUrl: userProfile.external_urls.spotify,
//         country: userProfile.country,
//         followers: userProfile.followers.total,
//       });

//       res.cookie("access_token", access_token, {});
//       res.redirect(FRONTEND_URL); // Redirect to frontend after successful authorization
//     } else {
//       // Store the token and user information in the database
//       await Token.create({
//         userId: userProfile.id,
//         accessToken: access_token,
//         refreshToken: refresh_token,
//       });

//       // Optionally, create a user record if needed
//       // await User.create({ id: userId, displayName, email, profileImageUrl });

//       res.cookie("access_token", access_token, {});
//       res.redirect(FRONTEND_URL); // Redirect to frontend after successful authorization
//     }
//   } catch (error) {
//     console.error("Error fetching access token:", error.message);
//     if (error.response) {
//       return res
//         .status(error.response.status)
//         .json({ error: error.response.data });
//     } else {
//       return res.status(500).json({ error: "Failed to authenticate" });
//     }
//   }
// });
// module.exports = router;

// ....PREVIOUS WORKING CODE (BEFORE USER TABLE)....
// ..............................
const express = require("express");
const axios = require("axios");
const { Token } = require("../../database/dbConnection"); // Correct model import
const router = express.Router();

const crypto = require("crypto");

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  FRONTEND_URL,
  SCOPE,
} = process.env;

router.get("/login", (req, res) => {
  const scope = SCOPE;
  const state = crypto.randomBytes(16).toString("hex"); // Generate a random state
  req.session.state = state;

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=${scope}&state=${state}`;
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state !== req.session.state) {
    return res
      .status(400)
      .json({ error: "State mismatch. Potential CSRF attack." });
  }

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required." });
  }

  try {
    const urlParams = new URLSearchParams();
    urlParams.append("grant_type", "authorization_code");
    urlParams.append("code", code);
    urlParams.append("redirect_uri", SPOTIFY_REDIRECT_URI);
    urlParams.append("client_id", SPOTIFY_CLIENT_ID);
    urlParams.append("client_secret", SPOTIFY_CLIENT_SECRET);

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      urlParams, // Use encoded form data
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log(response.data);

    const { access_token, refresh_token } = response.data;
    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userId = userResponse.data.id;
    req.session.userId = userId;

    const existingToken = await Token.findOne({ where: { userId: userId } });

    if (existingToken) {
      existingToken.accessToken = access_token;
      existingToken.refreshToken = refresh_token;
      await existingToken.save();
      res.cookie("access_token", access_token, {});
      return res.redirect(FRONTEND_URL);

      // Setting the cookie (res.cookie(...)) before the redirect (res.redirect(...)). The redirect is the final step in the response cycle.
      // Once you call res.redirect(), the response is sent to the client, so make sure that no other response is sent afterward.
    } else {
      await Token.create({
        userId: userId,
        accessToken: access_token,
        refreshToken: refresh_token,
      });

      res.cookie("access_token", access_token, {
        //  secure:true
      });

      res.redirect(FRONTEND_URL);

      // •	Ensure you only call one response method (res.json, res.redirect, or res.send) per request.
      // •	If you're sending a redirect, set any cookies before calling res.redirect.
      // •	If you're sending a JSON response, avoid calling a redirect afterward.
      // This should resolve the Cannot set headers after they are sent to the client error. Let me know if you need further clarification!
    }
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    } else {
      return res.status(500).json({ error: "Failed to authenticate" });
    }
  }
});

module.exports = router;