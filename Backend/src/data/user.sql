DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    username TEXT,
    password TEXT,
    email TEXT, 
    birthday TEXT,
    gender TEXT, 
    phone TEXT,
    avatar_url TEXT,    
);