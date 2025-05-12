convert.js

import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const dbPath = path.resolve(__dirname, 'songs.db'); // Ensure this is the correct path

// 載入 JSON 資料
const songs = JSON.parse(fs.readFileSync(path.resolve(__dirname, './songs.json'), 'utf8'));


// 建立 SQLite 資料庫
const db = new sqlite3.Database('./songs.db');

// 建立表格
db.serialize(() => {
    // 如果有舊的 "songs" 表格，先刪除
    db.run(`DROP TABLE IF EXISTS songs`);

    // 創建新的表格
    db.run(`CREATE TABLE songs (
        id INTEGER PRIMARY KEY,
        name TEXT,
        artist TEXT,
        poster TEXT,
        description TEXT,
        publish INTEGER,
        tags TEXT,
        music TEXT,
        comment TEXT,
        price REAL
    )`);

    // 準備插入資料的 SQL
    const insert = db.prepare(`INSERT INTO songs (id, name, artist, poster, description, publish, tags, music, comment, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    // 逐一插入每首歌曲的資料
    songs.forEach(song => {
        insert.run(
            song.id,
            song.name,
            song.artist,
            song.poster,
            song.description,
            song.publish,
            JSON.stringify(song.tags), // 將陣列轉換為 JSON 字串
            JSON.stringify(song.music), // 將陣列轉換為 JSON 字串
            JSON.stringify(song.comment), // 將陣列轉換為 JSON 字串
            song.price
        );
    });

    // 完成插入後關閉資料庫
    insert.finalize(() => {
        console.log("✅ 資料已成功寫入 songs.db");
        db.close();
    });
});
