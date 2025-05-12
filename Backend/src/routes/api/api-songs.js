// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();


// Import database helper functions
import {
    retrieveSongs,
    retrieveSongById,
    addAlbum,
    addMusic
} from "../../data/songs-dao.js";

// Route: GET /
// Retrieves a list of songs, optionally filtered by query parameters
router.get("/", async (req, res) => {
    const songs = await retrieveSongs(req.query);
    return res.json(songs);
});

// Route: GET /:id
// Retrieves a single song by its ID
router.get("/:id", async (req, res) => {
    const song = await retrieveSongById(parseInt(req.params.id));
    if (!song) return res.sendStatus(404); // Song not found
    return res.status(200).json(song);
});

// Route: PUT /:id
// Updates the "music" URLs of a specific song
router.put("/:id", (req, res) => {
    const songId = parseInt(req.params.id);
    const newMusic = req.body.music;

    try {
        const updatedSong = addMusic(songId, newMusic);
        res.status(200).json(updatedSong);
    } catch (error) {
        if (typeof error === "string" && error.includes("not found")) {
            return res.status(404).json({ error });
        }
        return res.status(400).json({ error: error.toString() });
    }
});

// Route: POST /
// Adds a new album entry
router.post("/", (req, res) => {
    const { name, artist, poster, description, publish, tags, music, price } = req.body;

    // Call DAO function to insert new album into DB
    const newAlbum = addAlbum(name, artist, poster, description, publish, tags, music, price);

    if (!newAlbum) {
        return res.status(400).json({ error: "Invalid album data. Please check your input." });
    }

    return res.status(201).json(newAlbum); // Return the created album
});

export default router;
