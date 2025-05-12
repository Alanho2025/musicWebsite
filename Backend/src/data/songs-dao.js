// Import validation schema library
import yup from "yup";
// Import SQLite3 for working with SQLite database
import sqlite3 from 'sqlite3';
// Import path to resolve file paths properly
import path from 'path';

// Get the current directory (since ES Modules don’t have __dirname by default)
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Set the database file path
const dbPath = path.resolve(__dirname, 'songs.db');

// Open a connection to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to open database:', err.message);
    } else {
        console.log('Connected to the song.db database.');
    }
});

// 📥 Function to retrieve all songs (optionally filtered by search criteria)
export function retrieveSongs(search) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM songs';
        let params = [];

        // Construct WHERE conditions based on search input
        if (search) {
            const { name, artist, publish } = search;
            const conditions = [];

            if (name) {
                conditions.push('name LIKE ?');
                params.push(`%${name}%`);
            }

            if (artist) {
                conditions.push('artist LIKE ?');
                params.push(`%${artist}%`);
            }

            if (publish) {
                conditions.push('publish = ?');
                params.push(publish);
            }

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
        }

        // Execute SQL query
        db.all(query, params, (err, rows) => {
            if (err) {
                reject('Error retrieving songs from the database: ' + err.message);
            } else {
                // 🔁 Convert JSON strings to arrays/objects (tags, music, comments)
                const parsedRows = rows.map(row => {
                    try {
                        return {
                            ...row,
                            tags: JSON.parse(row.tags || '[]'),
                            music: JSON.parse(row.music || '[]'),
                            comment: JSON.parse(row.comment || '[]')
                        };
                    } catch (e) {
                        console.warn('JSON parse error in row:', row);
                        return row;
                    }
                });
                resolve(parsedRows);
            }
        });
    });
}

// 🔍 Function to retrieve a single song by ID
export function retrieveSongById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM songs WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject('Error retrieving song by ID: ' + err.message);
            } else {
                resolve(row);
            }
        });
    });
}

// ✅ Schema to validate a single YouTube music URL
const createMusicSchema = yup
    .object({
        music: yup.string().url().matches(/^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/, 'Must be a valid YouTube URL').required()
    })
    .required();

// ✅ Schema to validate album creation input
const createAlbumSchema = yup.object({
    name: yup.string().min(1).required(),
    artist: yup.string().min(1).required(),
    poster: yup.string().url().required(),
    description: yup.string().min(10).required(),
    publish: yup
        .number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear() + 5)
        .required(),
    tags: yup
        .array()
        .of(yup.string().min(1))
        .required(),
    music: yup
        .array()
        .of(
            yup
                .string()
                .url()
                .matches(/^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/, 'Must be a valid YouTube URL')
        )
        .min(1, 'At least one song is required')
        .required(),
    price: yup.number().min(0).required(),
}).required();

// ➕ Add a new album into the database
export function addAlbum(name, artist, poster, description, publish, tags, music, price) {
    const newAlbumData = {
        name,
        artist,
        poster,
        description,
        publish,
        tags: JSON.stringify(tags),   // Store arrays as JSON strings in DB
        music: JSON.stringify(music), // Same for music
        price
    };

    try {
        // 🛡 Validate input data using Yup schema
        createAlbumSchema.validateSync(newAlbumData);

        const query = `INSERT INTO albums (name, artist, poster, description, publish, tags, music, price)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        // 🚀 Run insert query
        db.run(query, [
            newAlbumData.name,
            newAlbumData.artist,
            newAlbumData.poster,
            newAlbumData.description,
            newAlbumData.publish,
            newAlbumData.tags,
            newAlbumData.music,
            newAlbumData.price
        ], function (err) {
            if (err) {
                console.error('❌ Error adding album:', err.message);
                return null;
            } else {
                const newAlbum = {
                    id: this.lastID,  // Get the ID of the newly inserted row
                    ...newAlbumData
                };
                console.log(`🎉 Album '${newAlbum.name}' added successfully!`);
                return newAlbum;
            }
        });

    } catch (error) {
        console.error("❌ Invalid album data:", error.errors || error.message);
        return null;
    }
}

// ➕ Append a new YouTube URL to the music list of an existing song
export function addMusic(songId, newMusic) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(newMusic)) {
            return reject("Music must be an array.");
        }

        // Validate all are URLs
        const isValidURL = (url) => typeof url === "string" && /^https?:\/\/.+/.test(url);
        if (!newMusic.every(isValidURL)) {
            return reject("All music URLs must be valid.");
        }

        db.get('SELECT * FROM songs WHERE id = ?', [songId], (err, song) => {
            if (err) return reject(`Error retrieving song with ID ${songId}: ${err.message}`);
            if (!song) return reject(`Song with ID ${songId} not found.`);

            let currentMusic = [];
            try {
                currentMusic = song.music ? JSON.parse(song.music) : [];
            } catch (e) {
                return reject("Invalid music data format in DB.");
            }

            const uniqueMusic = Array.from(new Set([...currentMusic, ...newMusic]));

            db.run('UPDATE songs SET music = ? WHERE id = ?', [JSON.stringify(uniqueMusic), songId], function (err) {
                if (err) return reject(`Error updating music: ${err.message}`);

                resolve({
                    id: songId,
                    name: song.name,
                    artist: song.artist,
                    music: uniqueMusic
                });
            });
        });
    });
}

