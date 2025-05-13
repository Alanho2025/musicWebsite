import express from "express";

const router = express.Router();


import songsRoutes from "./api-songs.js";
router.use("/songs", songsRoutes);

import usersRoutes from "./api-users.js";
router.use("/users", usersRoutes);
export default router;