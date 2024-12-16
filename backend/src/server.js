require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

console.log("SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID);
console.log("SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Spotify API Routes
app.use("/api/spotify", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
