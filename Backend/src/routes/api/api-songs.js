// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import sqlite3 from 'sqlite3';
import path from 'path';

// Get the current directory path in ES Module environment
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Resolve absolute path to the SQLite database file
const dbPath = path.resolve(__dirname, 'songs.db'); // Ensure this is the correct path

// Initialize SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Failed to open database:', err.message);
    } else {
        console.log('✅ Connected to the song.db database.');
    }
});

// Import database helper functions
import {
    retrieveSongs,
    retrieveSongById,
    addAlbum
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
    const updatedMusic = req.body.music;

    // Validate that "music" is an array
    if (!Array.isArray(updatedMusic)) {
        return res.status(400).json({ error: "music must be an array." });
    }

    // Helper function to check if a string is a valid URL
    const isValidURL = (url) =>
        typeof url === "string" && /^https?:\/\/.+/.test(url);

    // Validate all items in the array are valid URLs
    if (!updatedMusic.every(isValidURL)) {
        return res.status(400).json({ error: "All music URLs must be valid." });
    }

    // Retrieve the current song by ID
    db.get('SELECT * FROM songs WHERE id = ?', [songId], (err, song) => {
        if (err) {
            return res.status(500).json({ error: `Error retrieving song with id ${songId}: ${err.message}` });
        }

        if (!song) {
            return res.status(404).json({ error: `Song with id ${songId} not found.` });
        }

        // Parse the current music field from JSON
        let currentMusic = song.music ? JSON.parse(song.music) : [];

        // Merge existing and new music URLs, removing duplicates
        const uniqueMusic = Array.from(new Set([...currentMusic, ...updatedMusic]));

        // Update the music field in the database
        db.run('UPDATE songs SET music = ? WHERE id = ?', [JSON.stringify(uniqueMusic), songId], function (err) {
            if (err) {
                return res.status(500).json({ error: `Error updating song's music: ${err.message}` });
            }

            console.log(`✅ Updated music list for '${song.name}'`);

            // Send back updated song object
            res.status(200).json({
                id: songId,
                name: song.name,
                artist: song.artist,
                music: uniqueMusic
            });
        });
    });
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
