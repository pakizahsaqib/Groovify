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
      urlParams,
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
    console.log("RESPONSE BACKEND", response.data);

    const userId = userResponse.data.id;
    const userName = userResponse.data.display_name;
    console.log("Backend : ID", userId);
    console.log("Backend : Name", userName);

    // Debug the lengths and data
    console.log("Access Token Length:", access_token.length);
    console.log("Refresh Token Length:", refresh_token.length);
    console.log("User ID:", userId);
    req.session.userId = userId;

    const existingToken = await Token.findOne({ where: { userId: userId } });

    if (existingToken) {
      existingToken.accessToken = access_token;
      existingToken.refreshToken = refresh_token;
      await existingToken.save();
      res.cookie("access_token", access_token, {});
      // Return user data to frontend
      return res.redirect(
        `${FRONTEND_URL}/main?userId=${userId}&username=${userName}`
      );
    } else {
      await Token.create({
        userId: userId,
        accessToken: access_token,
        refreshToken: refresh_token,
      });

      res.cookie("access_token", access_token, {
        // secure:true
      });
      //same return to frontend
      res.redirect(`${FRONTEND_URL}?userId=${userId}&username=${userName}`);
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
