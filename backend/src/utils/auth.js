// utils/auth.js
const axios = require("axios");

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify Client ID or Client Secret is missing!");
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await axios.post(
      tokenUrl,
      "grant_type=client_credentials", // No user authorization needed
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;

    if (!accessToken) {
      throw new Error("Access token not found in response");
    }

    return accessToken;
  } catch (error) {
    console.error("Failed to retrieve access token:", error.message);
    throw new Error("Unable to authenticate with Spotify API");
  }
}

module.exports = { getSpotifyAccessToken };
