import express from "express";

const router = express.Router();


import songsRoutes from "./api-songs.js";
router.use("/songs", songsRoutes);
export default router;