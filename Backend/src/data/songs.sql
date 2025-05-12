DROP TABLE IF EXISTS songs;

CREATE TABLE IF NOT EXISTS songs (
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
);


INSERT INTO songs VALUES
(
    1,
    'hot',
    'LE SSERAFIM',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtQb9WbxbI4QX55KrnFYvhvvh3HzxKrRrNA&s',
    "LE SSERAFIM's 2025 hit single 'Hot' blends high-energy EDM beats with a bold girl crush aesthetic, showcasing powerful choreography and visuals.",
    2025,
    '["girl group", "EDM", "dance-pop", "LE SSERAFIM"]',   
    '["https://www.youtube.com/embed/sLMXW_Dij50?si=S0nxfZPR8udzSrAz"]',
    '[]',
    30.05
);
INSERT INTO songs VALUES
(2,
'Supernova Love',
'IVE',
'https://i.ytimg.com/vi/Xq-eunLqtfU/hqdefault.jpg',
'IVE collaborates with David Guetta in ''Supernova Love'', merging K-pop with electronic beats and sampling Ryuichi Sakamoto''s ''Merry Christmas Mr. Lawrence''.',
2024,
'["K-pop", "electronic", "collaboration", "IVE"]',
'["https://www.youtube.com/embed/Xq-eunLqtfU?si=1q0fGghoImgrqg2r"]',
'[]',
32.05
);

INSERT INTO songs VALUES
(3,
'Spicy',
'aespa',
'https://m.media-amazon.com/images/M/MV5BYzZiNTQ0NjQtZGY1ZS00NTMzLWFjMTEtMjEwODQyYThiYTE1XkEyXkFqcGc@._V1_.jpg',
'aespa''s ''Spicy'' showcases their unique blend of hyper-pop and futuristic visuals, solidifying their position in the K-pop scene.',
2023,
'["K-pop", "hyper-pop", "aespa", "futuristic"]',
'["https://www.youtube.com/embed/Os_heh8vPfs?si=4iGpyNsmXkydV6Pc"]',
'[]',
31.25
);

INSERT INTO songs VALUES
(4,
'Pink Venom',
'BLACKPINK',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCS0pNTGSI2lsDTZx0xhKHx0V1iWMCXBGsBg&s',
'BLACKPINK''s ''Pink Venom'' combines traditional Korean instruments with modern beats, delivering a powerful pre-release single.',
2022,
'["K-pop", "BLACKPINK", "fusion", "pre-release"]',
'["https://www.youtube.com/embed/gQlMMD8auMs?si=7Jn2ofGzSAKWsN5n"]',
'[]',
28.25
);

INSERT INTO songs VALUES
(5,
'N/a',
'IZNA',
'https://i.scdn.co/image/ab67616d0000b2732782bd215dcefd7665412b87',
'IZNA''s debut EP ''N/a'' introduces the group''s versatility and strong performance skills, marking their entry into the K-pop industry.',
2024,
'["K-pop", "debut", "IZNA", "EP"]',
'["https://www.youtube.com/embed/d3mqW9wqqx0?si=T4i2yDctf9zUTak3"]',
'[]',
26.25
);

INSERT INTO songs VALUES
(6,
'GOLD',
'ITZY',
'https://upload.wikimedia.org/wikipedia/en/e/e3/Itzy_-_Gold.jpg',
'ITZY''s ''GOLD'' features powerful vocals and rap, highlighting their cool charisma and unique musical color.',
2024,
'["K-pop", "ITZY", "powerful", "charisma"]',
'["https://www.youtube.com/embed/eMk_0svqsnI?si=IbQAshVqLqcdHh_e"]',
'[]',
20.25
);

INSERT INTO songs VALUES
(7,
'APT.',
'Rosé',
'https://upload.wikimedia.org/wikipedia/en/5/52/Ros%C3%A9_and_Bruno_Mars_-_Apt..png',
'Rosé''s ''APT.'' is an up-tempo track blending pop-rock and new wave, inspired by a South Korean drinking game.',
2024,
'["solo", "Rosé", "pop-rock", "new wave"]',
'["https://www.youtube.com/embed/ekr2nIex040?si=Dq2QxndPPJZnbO-E"]',
'[]',
32.25
);

INSERT INTO songs VALUES
(8,
'Ruby',
'Jennie',
'https://media.pitchfork.com/photos/67c9d295c4d5104730240671/2:3/w_2000,h_3000,c_limit/JENNIE:%20Ruby.jpg',
'Jennie''s debut solo album ''Ruby'' showcases a mix of genres, emphasizing personal empowerment and artistic growth.',
2025,
'["solo", "Jennie", "empowerment", "genre-mix"]',
'["https://www.youtube.com/embed/JSFG-IE8n_c?si=Q98v0vdiojf7r1P3"]',
'[]',
31.25
);

INSERT INTO songs VALUES
(9,
'Flower',
'Jisoo',
'https://kpopofficial.com/wp-content/uploads/2023/06/1-BLACKPINK-JISOO-Flower-Lyrics-Meaning-English-Translation.jpg',
'Jisoo''s ''Flower'' is a melodic track highlighting her vocal prowess and marking her solo debut.',
2023,
'["solo", "Jisoo", "melodic", "debut"]',
'["https://www.youtube.com/embed/YudHcBIxlYw?si=zEqGaJLTT0UpyiMe"]',
'[]',
30.25
);

INSERT INTO songs VALUES
(10,
'Easy',
'LE SSERAFIM',
'https://images.genius.com/6c5f6f1f49490b33055d77065ad2257e.1000x1000x1.jpg',
'LE SSERAFIM''s ''Easy'' combines smooth vocals with a catchy beat, reflecting their evolving musical style.',
2024,
'["K-pop", "LE SSERAFIM", "smooth", "evolution"]',
'["https://www.youtube.com/embed/bNKXxwOQYB8?si=DlKbgqdPRTpcSgQn"]',
'[]',
27.25
);
INSERT INTO songs (id, name, artist, poster, description, publish, tags, music, comment, price) VALUES
(11, 'After LIKE', 'IVE', 'https://m.media-amazon.com/images/M/MV5BOWUxYWJjYzEtMzA4Mi00OTk3LTgyN2ItMWVjYzIzZjMzMzNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'IVE''s ''After LIKE'' samples Gloria Gaynor''s ''I Will Survive'', blending retro disco with modern K-pop elements.', 2022, '["K-pop", "retro", "IVE", "disco"]', '["https://www.youtube.com/embed/F0B7HDiY-10?si=tvxuiLf6e-dib_ln"]', '[]', 27.25),
(12, 'Next Level', 'aespa', 'https://upload.wikimedia.org/wikipedia/en/2/2e/Aespa_-_Next_Level.jpg', 'aespa''s ''Next Level'' is a genre-bending track that became a viral hit, showcasing their innovative approach.', 2021, '["K-pop", "aespa", "innovative", "viral"]', '["https://www.youtube.com/embed/4TWR90KJl84?si=ohd-YagoK-uigWea"]', '[]', 29.25),
(13, 'How You Like That', 'BLACKPINK', 'https://upload.wikimedia.org/wikipedia/en/e/eb/Blackpink_-_How_You_Like_That.png', 'BLACKPINK''s ''How You Like That'' delivers a powerful message of resilience with dynamic beats and visuals.', 2020, '["K-pop", "BLACKPINK", "resilience", "dynamic"]', '["https://www.youtube.com/embed/ioNng23DkIM?si=K8tv9rUl0B8DwgiP"]', '[]', 27.25),
(14, 'Sign', 'IZNA', 'https://i.scdn.co/image/ab67616d0000b273ab13603a13a48f5e4c8b5f9e', 'IZNA''s ''Sign'' is their first digital single post-debut, showcasing their growth and musical direction.', 2025, '["K-pop", "IZNA", "digital single", "growth"]', '["https://www.youtube.com/embed/88GkYKvnvvI?si=osu79qmv8rKWIPVw"]', '[]', 28.25),
(15, 'Not Shy', 'ITZY', 'https://m.media-amazon.com/images/M/MV5BYjc2YTllYTAtYzQzOS00NGY0LWE4NWUtYTI5YmQ2YzRhYzYyXkEyXkFqcGc@._V1_.jpg', 'ITZY''s ''Not Shy'' emphasizes themes of confidence and boldness, with catchy hooks and vibrant visuals.', 2020, '["K-pop", "ITZY", "confidence", "vibrant"]', '["https://www.youtube.com/embed/wTowEKjDGkU?si=zIM9ZTGuPiQAx17H"]', '[]', 28.25),
(16, 'On The Ground', 'Rosé', 'https://upload.wikimedia.org/wikipedia/en/2/2f/Ros%C3%A9_-_On_the_Ground.jpg', 'Rosé''s ''On The Ground'' reflects on personal growth and self-realization, marking her solo debut.', 2021, '["solo", "Rosé", "introspective", "debut"]', '["https://www.youtube.com/embed/CKZvWhCqx1s?si=TygL0HPkFO9XS4I9"]', '[]', 29.25),
(17, 'SOLO', 'Jennie', 'https://upload.wikimedia.org/wikipedia/en/2/20/Jennie_%E2%80%93_%22Solo%22_%E2%80%93_Digital_Cover.png', 'Jennie''s ''SOLO'' combines EDM-pop elements with lyrics about independence and self-love.', 2018, '["solo", "Jennie", "EDM-pop", "independence"]', '["https://www.youtube.com/embed/b73BI9eUkjM?si=TMnK6Jkhbbq9ThL2"]', '[]', 30.25),
(18, 'All Eyes On Me', 'Jisoo', 'https://i1.sndcdn.com/artworks-yPfFinRp0Iwjn5yd-yFGLtg-t500x500.jpg', 'Jisoo''s ''All Eyes On Me'' is a B-side track from her solo debut, highlighting her versatility.', 2023, '["solo", "Jisoo", "versatility", "B-side"]', '["https://www.youtube.com/embed/z50NUuwI66c?si=YBol60zHX_H8spU0"]', '[]', 31.25),
(19, 'UNFORGIVEN', 'LE SSERAFIM', 'https://images.genius.com/538d287d5ec77faaacf8d6a56c1768da.1000x1000x1.jpg', 'LE SSERAFIM''s ''UNFORGIVEN'' features a collaboration with Nile Rodgers, blending funk and K-pop.', 2023, '["K-pop", "LE SSERAFIM", "funk", "collaboration"]', '["https://www.youtube.com/embed/UBURTj20HXI?si=2yu_szEqbIkNPcd9"]', '[]', 32.25),
(20, 'Earthquake', 'Jisoo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzmNaj4f45qnLn3QaQz9tm_jM9pbEVYmmS0A&s', 'Jisoo''s ''Earthquake'' delivers a seismic blend of powerful vocals and emotional depth, expressing inner conflict and personal growth.', 2025, '["solo", "Jisoo", "K-pop", "emotional", "powerful vocals"]', '["https://www.youtube.com/embed/2V6lvCUPT8I?si=qaTWkHcZYXnh6o4M"]', '[]', 31.25);
