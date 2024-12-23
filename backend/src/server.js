require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");

console.log("SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID);
console.log("SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "your-session-secret", // Replace with a more secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
