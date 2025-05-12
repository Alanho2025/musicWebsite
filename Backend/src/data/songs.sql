DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id INTEGER PRIMARY KEY,
    name TEXT,
    artist TEXT,
    poster TEXT,
    description TEXT,
    publish INTEGER,
    price REAL
);

CREATE TABLE song_tags (
    song_id INTEGER,
    tag TEXT
);

CREATE TABLE song_music (
    song_id INTEGER,
    url TEXT
);

CREATE TABLE song_comments (
    song_id INTEGER,
    comment TEXT
);

INSERT INTO songs VALUES (
    1,
    'hot',
    'LE SSERAFIM',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtQb9WbxbI4QX55KrnFYvhvvh3HzxKrRrNA&s',
    "LE SSERAFIM's 2025 hit single 'Hot' blends high-energy EDM beats with a bold girl crush aesthetic, showcasing powerful choreography and visuals.",
    2025,
    30.05
);

INSERT INTO song_tags VALUES 
(1, 'girl group'),
(1, 'EDM'),
(1, 'dance-pop'),
(1, 'LE SSERAFIM');

INSERT INTO song_music VALUES 
(1, 'https://www.youtube.com/embed/sLMXW_Dij50?si=S0nxfZPR8udzSrAz');

INSERT INTO songs VALUES (
    1,
    'hot',
    'LE SSERAFIM',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtQb9WbxbI4QX55KrnFYvhvvh3HzxKrRrNA&s',
    "LE SSERAFIM's 2025 hit single 'Hot' blends high-energy EDM beats with a bold girl crush aesthetic, showcasing powerful choreography and visuals.",
    2025,
    30.05
);

INSERT INTO song_tags VALUES 
(1, 'girl group'),
(1, 'EDM'),
(1, 'dance-pop'),
(1, 'LE SSERAFIM');

INSERT INTO song_music VALUES 
(1, 'https://www.youtube.com/embed/sLMXW_Dij50?si=S0nxfZPR8udzSrAz');

