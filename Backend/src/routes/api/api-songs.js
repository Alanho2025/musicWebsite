import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import {
    retrieveSongs,
    retrieveSongById,
    songs,
    addAlbum
} from "../../data/songs-dao.js";

router.get("/", async (req, res) => {
    const songs = await retrieveSongs(req.query);
    return res.json(songs);
});

router.get("/:id", async (req, res) => {
    const song = await retrieveSongById(parseInt(req.params.id));
    if (!song) return res.sendStatus(404);
    return res.status(200).json(song);
});

router.put("/:id", (req, res) => {
    const songId = parseInt(req.params.id);
    const updatedMusic = req.body.music;

    // Find the song with matching ID
    const song = songs.find((s) => s.id === songId);
    if (!song) {
        return res.status(404).json({ error: `Song with id ${songId} not found.` });
    }

    // Check if updatedMusic is an array
    if (!Array.isArray(updatedMusic)) {
        return res.status(400).json({ error: "music must be an array." });
    }

    // Check all URLs are valid
    const isValidURL = (url) =>
        typeof url === "string" && /^https?:\/\/.+/.test(url);

    if (!updatedMusic.every(isValidURL)) {
        return res.status(400).json({ error: "All music URLs must be valid." });
    }

    // Merge and deduplicate the music URLs
    const uniqueMusic = Array.from(new Set([...song.music, ...updatedMusic]));
    song.music = uniqueMusic;

    console.log(`✅ Updated music list for '${song.name}'`);
    return res.status(200).json(song);
});


router.post("/", (req, res) => {
    const { name, artist, poster, description, publish, tags, music, price } = req.body;
    const newAlbum = addAlbum(name, artist, poster, description, publish, tags, music, price);

    if (!newAlbum) {
        return res.status(400).json({ error: "Invalid album data. Please check your input." });
    }

    return res.status(201).json(newAlbum);
});

export default router;