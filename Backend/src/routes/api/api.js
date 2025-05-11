import express from "express";

const router = express.Router();

import todosRoutes from "./api-todos.js";
router.use("/todos", todosRoutes);

import petsRoutes from "./api-pets.js";
router.use("/pets", petsRoutes);

import songsRoutes from "./api-songs.js";
router.use("/songs", songsRoutes);
export default router;