DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    password TEXT,
    birthday TEXT,
    login_state TEXT,
    email TEXT,       
    gender TEXT,      
    avatar_url TEXT,    
    gender TEXT
);