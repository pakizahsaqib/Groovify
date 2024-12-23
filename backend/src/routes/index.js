const express = require("express");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const artistRouter = require("./artistRouter");
const albumRouter = require("./albumRouter");
const playlistRouter = require("./playlistRouter");
const popularRouter = require("./popularRouter");
const trackRouter = require("./trackRouter");
const searchRouter = require("./searchRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/artists", artistRouter);
router.use("/albums", albumRouter);
router.use("/playlists", playlistRouter);
router.use("/popular", popularRouter);
router.use("/tracks", trackRouter);
router.use("/search", searchRouter);

module.exports = router;
