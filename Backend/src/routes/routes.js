import express from "express";

const router = express.Router();

import apiRoutes from "./api/api.js";
router.use("/api", apiRoutes);

export default router;
