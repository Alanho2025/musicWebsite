<script>
    // Import environment variable for API endpoint
    import { PUBLIC_SONGS_API } from "$env/static/public";
    // Import Svelte store for managing songs
    import { songsStore } from "$lib/stores/SongsRestore.js";

    // ==== States for editing an existing album ====

    // Array of input fields for new song URLs
    let editAlbumMusicInputs = [""];
    // Array of input fields for creating new album music
    let newAlbumMusicInputs = [""];
    // Album name being edited
    let albumToEdit = "";
    // Artist name being edited
    let artistToEdit = "";
    // Show success message after adding music
    let showSuccessMusicAdd = false;

    // Add a new input field for adding song URL
    function addMusicField() {
        editAlbumMusicInputs.push("");
    }

    // Remove a specific input field for song URL
    function removeMusicField(index) {
        editAlbumMusicInputs.splice(index, 1);
    }

    // Submit new music to an existing album
    async function submitNewMusic() {
        try {
            // Fetch existing songs from API
            const response = await fetch(PUBLIC_SONGS_API);
            const songs = await response.json();

            // Try to match existing album by artist and album name
            const matchedSong = songs.find(
                (song) =>
                    song.artist.toLowerCase().trim() ===
                        artistToEdit.toLowerCase().trim() &&
                    song.name.toLowerCase().trim() ===
                        albumToEdit.toLowerCase().trim()
            );

            // Alert if album is not found
            if (!matchedSong) {
                alert(
                    "No matching album found. Please check artist and album name."
                );
                return;
            }

            // Remove empty strings and duplicates
            const newUrls = editAlbumMusicInputs
                .map((url) => url.trim())
                .filter((url) => url && !matchedSong.music.includes(url));

            if (newUrls.length === 0) {
                alert("No new valid music URLs to add.");
                return;
            }

            // Combine existing and new music URLs
            const updatedMusic = [...matchedSong.music, ...newUrls];

            // Update the album with new music URLs via PUT
            const updateRes = await fetch(
                `${PUBLIC_SONGS_API}${matchedSong.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...matchedSong,
                        music: updatedMusic,
                    }),
                }
            );

            // If update successful, update store and UI
            if (updateRes.ok) {
                showSuccessMusicAdd = true;
                editAlbumMusicInputs = [""];

                const updatedAlbum = { ...matchedSong, music: updatedMusic };
                songsStore.update((songs) =>
                    songs.map((song) =>
                        song.id === matchedSong.id ? updatedAlbum : song
                    )
                );
            } else {
                const errorMsg = await updateRes.text();
                alert("Update failed: " + errorMsg);
            }
        } catch (error) {
            console.error(error);
            alert("Error occurred. Check the console.");
        }
    }

    // ==== States for creating a new album ====

    let newArtist = "";          // Artist name for new album
    let albumName = "";          // Album name
    let coverImage = "";         // Album cover image URL
    let publishYear = "";        // Album release year
    let price = "";              // Album price
    let description = "";        // Album description
    let tags = "";               // Album tags
    let showSuccessAlbumAdd = false; // Show success message after album creation

    // Add new music input field for new album
    function addNewAlbumMusicField() {
        newAlbumMusicInputs.push("");
    }

    // Remove specific music input field for new album
    function removeNewAlbumMusicField(index) {
        newAlbumMusicInputs.splice(index, 1);
    }

    // Submit new album creation form
    async function submitNewAlbum() {
        try {
            // Clean and validate music URLs
            const newMusics = newAlbumMusicInputs
                .map((url) => url.trim())
                .filter(Boolean);

            // Make POST request to create new album
            const res = await fetch(PUBLIC_SONGS_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: albumName,
                    artist: newArtist,
                    poster: coverImage,
                    publish: publishYear,
                    description: description, 
                    price: price,
                    tags: tags,
                    music: newMusics,
                }),
            });

            if (res.ok) {
                showSuccessAlbumAdd = true;
                const createdAlbum = await res.json();

                // Update store with new album
                songsStore.update((songs) => [...songs, createdAlbum]);

                // Reset form fields
                newArtist = albumName = coverImage = description = tags = "";
                publishYear = price = 0;
                newAlbumMusicInputs = [""];
            } else {
                const errorText = await res.text();
                alert("Album creation failed: " + errorText);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Check the console.");
        }
    }
</script>

<!-- Form: Add Music to Existing Album -->
<main class="form-container">
    <!-- Form: Add Songs -->
    <form on:submit|preventDefault={submitNewMusic} class="form-card">
        <h2>Add Songs to Existing Album</h2>
        <input type="text" bind:value={artistToEdit} placeholder="Artist" />
        <input type="text" bind:value={albumToEdit} placeholder="Album Name" />

        {#each editAlbumMusicInputs as url, index}
            <div class="input-group">
                <input
                    type="text"
                    bind:value={editAlbumMusicInputs[index]}
                    placeholder="Music URL"
                />
                {#if editAlbumMusicInputs.length > 1}
                    <button
                        type="button"
                        class="icon-btn"
                        on:click={() => removeEditMusicField(index)}>🗑</button
                    >
                {/if}
            </div>
        {/each}
        <button type="button" class="secondary-btn" on:click={addEditMusicField}
            >➕ Add Another</button
        >

        <button type="submit" class="primary-btn">Submit</button>

        {#if showSuccessMusicAdd}
            <div class="success">
                Songs added successfully!
                <button
                    class="close-btn"
                    on:click={() => (showSuccessMusicAdd = false)}>✖</button
                >
            </div>
        {/if}
    </form>

    <!-- Form: Add New Album -->
    <form on:submit|preventDefault={submitNewAlbum} class="form-card">
        <h2>Create New Album</h2>
        <input type="text" bind:value={newArtist} placeholder="Artist" />
        <input type="text" bind:value={albumName} placeholder="Album Name" />
        <input
            type="text"
            bind:value={coverImage}
            placeholder="Cover Image URL"
        />
        <input type="text" bind:value={description} placeholder="Description" />
        <input
            type="text"
            bind:value={tags}
            placeholder="Tags (comma-separated)"
        />
        <label>Publish Year</label>
        <input
            type="number"
            bind:value={publishYear}
            placeholder="Publish Year"
        />
        <label>Album Price</label>
        <input type="number" bind:value={price} placeholder="Price" />

        {#each newAlbumMusicInputs as url, index}
            <div class="input-group">
                <input
                    type="text"
                    bind:value={newAlbumMusicInputs[index]}
                    placeholder="Music URL"
                />
                {#if newAlbumMusicInputs.length > 1}
                    <button
                        type="button"
                        class="icon-btn"
                        on:click={() => removeNewAlbumMusicField(index)}
                        >🗑</button
                    >
                {/if}
            </div>
        {/each}
        <button
            type="button"
            class="secondary-btn"
            on:click={addNewAlbumMusicField}>➕ Add Another</button
        >

        <button type="submit" class="primary-btn">Submit</button>

        {#if showSuccessAlbumAdd}
            <div class="success">
                Album added successfully!
                <button
                    class="close-btn"
                    on:click={() => (showSuccessAlbumAdd = false)}>✖</button
                >
            </div>
        {/if}
    </form>
</main>

<style>
    /* Container to center everything */
    .form-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 2rem;
        padding: 2rem;
        background-color: #f0f2f5;
        flex-wrap: wrap;
    }

    .form-card {
        background: #fff;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        max-width: 480px;
        width: 100%;
        box-sizing: border-box;
    }

    h2 {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        color: #333;
    }

    input {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.6rem 0.8rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
        font-size: 0.95rem;
    }

    .input-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .icon-btn {
        background: transparent;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #c00;
    }

    .primary-btn,
    .secondary-btn {
        margin-top: 1rem;
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
    }

    .primary-btn {
        background-color: #007bff;
        color: white;
        margin-right: 0.5rem;
    }

    .primary-btn:hover {
        background-color: #0056b3;
    }

    .secondary-btn {
        background-color: #e2e6ea;
        color: #333;
    }

    .secondary-btn:hover {
        background-color: #cbd3da;
    }

    .success {
        margin-top: 1rem;
        background-color: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 8px;
        position: relative;
    }

    .close-btn {
        position: absolute;
        top: 8px;
        right: 12px;
        background: none;
        border: none;
        font-size: 1.1rem;
        cursor: pointer;
        color: #155724;
    }
</style>
