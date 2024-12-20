const axios = require("axios");
const { Token } = require("../../database/dbConnection");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_API_URL } =
  process.env;

const getUserIdFromToken = async (token) => {
  const tokenData = await Token.findOne({ where: { accessToken: token } });

  if (!tokenData) {
    throw new Error("No token found for this user.");
  }

  return tokenData.userId; // Get userId from the token record
};
const getAccessToken = async (userId) => {
  try {
    const tokenData = await Token.findOne({ where: { userId } });

    if (!tokenData) {
      throw new Error("No token found for this user.");
    }

    return tokenData.accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to retrieve access token.");
  }
};

const refreshAccessToken = async (refreshToken, userId) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: SPOTIFY_CLIENT_ID,
          client_secret: SPOTIFY_CLIENT_SECRET,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, expires_in } = response.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000); // Convert seconds to milliseconds
    await Token.upsert({
      userId,
      accessToken: access_token,
      refreshToken,
      expiresAt,
    });

    return access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token.");
  }
};

const getValidAccessToken = async (userId) => {
  try {
    const tokenData = await Token.findOne({ where: { userId } });

    if (!tokenData) {
      throw new Error("No token found for this user.");
    }

    const { accessToken, refreshToken, expiresAt } = tokenData;
    if (expiresAt && new Date() > new Date(expiresAt)) {
      console.log("Access token expired. Refreshing...");
      return await refreshAccessToken(refreshToken, userId);
    }

    return accessToken;
  } catch (error) {
    console.error("Error in getValidAccessToken:", error);
    throw new Error("Unable to retrieve a valid access token.");
  }
};

const makeSpotifyRequest = async (userId, endpoint) => {
  try {
    const accessToken = await getValidAccessToken(userId);

    // Make the request to Spotify with the access token
    const response = await axios.get(`${SPOTIFY_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error making request to Spotify:", error);
    throw new Error("Spotify API request failed.");
  }
};

module.exports = {
  getUserIdFromToken,
  getAccessToken,
  refreshAccessToken,
  getValidAccessToken,
  makeSpotifyRequest,
};
