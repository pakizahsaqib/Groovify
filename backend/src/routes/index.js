const express = require("express");
const artistRouter = require("./artistRouter");
const albumRouter = require("./albumRouter");
const playlistRouter = require("./playlistRouter");
const popularRouter = require("./popularRouter");
const featuredChartsRouter = require("./featuredChartsRouter");

const router = express.Router();

router.use("/artists", artistRouter);
router.use("/albums", albumRouter);
router.use("/playlists", playlistRouter);
router.use("/popular", popularRouter);
router.use("/featured", featuredChartsRouter);

module.exports = router;
