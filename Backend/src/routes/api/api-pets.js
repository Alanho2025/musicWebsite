import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import {
    retrievePets,
    retrievePetById,
} from "../../data/pets-dao.js";

router.get("/", async (req, res) => {
    const pets = await retrievePets(req.query);
    return res.json(pets);
});

router.get("/:id", async (req, res) => {
    const pet = await retrievePetById(parseInt(req.params.id));
    if (!pet) return res.sendStatus(404);
    return res.status(200).json(pet);
});

export default router;