const express = require("express");
const router = express.Router();

const { User, Token } = require("../../database/dbConnection");

router.post("/", async (req, res) => {
  const { accessToken, refreshToken } = req.body;

  if (!accessToken || !refreshToken) {
    return res
      .status(400)
      .json({ error: "Access token and refresh token are required." });
  }

  try {
    const userProfileResponse = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const userProfile = userProfileResponse.data;

    // Save or update user
    const [user, created] = await User.upsert({
      id: userProfile.id,
      displayName: userProfile.display_name,
      email: userProfile.email,
      profileImageUrl: userProfile.images[0]?.url || null,
      spotifyUrl: userProfile.external_urls.spotify,
      country: userProfile.country,
      followers: userProfile.followers.total,
    });

    // Save or update token
    await Token.upsert({
      userId: user.id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 3600 * 1000), // Example: 1 hour expiry
    });

    res.json({
      message: created
        ? "User and token created successfully"
        : "User and token updated successfully",
    });
  } catch (error) {
    console.error("Error saving user and token:", error.message || error);
    res.status(500).json({ error: "Failed to save user and token" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: Token,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message || error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});
module.exports = router;
