import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import sqlite3 from 'sqlite3';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const dbPath = path.resolve(__dirname, 'songs.db'); // Ensure this is the correct path

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to open database:', err.message);
    } else {
        console.log('Connected to the song.db database.');
    }
});


import {
    retrieveSongs,
    retrieveSongById,
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

    // Find the song by ID in the database
    db.get('SELECT * FROM songs WHERE id = ?', [songId], (err, song) => {
        if (err) {
            return res.status(500).json({ error: `Error retrieving song with id ${songId}: ${err.message}` });
        }

        if (!song) {
            return res.status(404).json({ error: `Song with id ${songId} not found.` });
        }

        // Parse existing music (assuming it's stored as a JSON string)
        let currentMusic = song.music ? JSON.parse(song.music) : [];

        // Merge and deduplicate the music URLs
        const uniqueMusic = Array.from(new Set([...currentMusic, ...updatedMusic]));

        // Update the music field in the database
        db.run('UPDATE songs SET music = ? WHERE id = ?', [JSON.stringify(uniqueMusic), songId], function (err) {
            if (err) {
                return res.status(500).json({ error: `Error updating song's music: ${err.message}` });
            }

            console.log(`✅ Updated music list for '${song.name}'`);

            // Return the updated song data
            res.status(200).json({
                id: songId,
                name: song.name,
                artist: song.artist,
                music: uniqueMusic
            });
        });
    });
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