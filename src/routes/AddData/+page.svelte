<script>
    import { PUBLIC_SONGS_API } from "$env/static/public";

    // States for adding music to existing album
    let musicInputs = [""];
    let albumToEdit = "";
    let artistToEdit = "";
    let showSuccessMusicAdd = false;

    function addMusicField() {
        musicInputs.push("");
    }

    function removeMusicField(index) {
        musicInputs.splice(index, 1);
    }

    async function submitNewMusic() {
        try {
            const response = await fetch(PUBLIC_SONGS_API);
            const songs = await response.json();

            const matchedSong = songs.find(
                (song) =>
                    song.artist.toLowerCase().trim() ===
                        artistToEdit.toLowerCase().trim() &&
                    song.name.toLowerCase().trim() ===
                        albumToEdit.toLowerCase().trim()
            );

            if (!matchedSong) {
                alert(
                    "No matching album found. Please check artist and album name."
                );
                return;
            }

            const newUrls = musicInputs
                .map((url) => url.trim())
                .filter((url) => url && !matchedSong.music.includes(url));

            if (newUrls.length === 0) {
                alert("No new valid music URLs to add.");
                return;
            }

            const updatedMusic = [...matchedSong.music, ...newUrls];

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

            if (updateRes.ok) {
                showSuccessMusicAdd = true;
                musicInputs = [""];
            } else {
                const errorMsg = await updateRes.text();
                alert("Update failed: " + errorMsg);
            }
        } catch (error) {
            console.error(error);
            alert("Error occurred. Check the console.");
        }
    }

    // States for creating new album
    let artist = "";
    let albumName = "";
    let coverImage = "";
    let publishYear = 0;
    let price = 0;
    let description = "";
    let tags = "";
    let showSuccessAlbumAdd = false;

    async function submitNewAlbum() {
        try {
            const trimmedUrls = musicInputs
                .map((url) => url.trim())
                .filter(Boolean);

            const res = await fetch(PUBLIC_SONGS_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: albumName,
                    artist,
                    poster: coverImage,
                    publish: publishYear,
                    description,
                    price,
                    tags,
                    music: trimmedUrls,
                }),
            });

            if (res.ok) {
                showSuccessAlbumAdd = true;
                artist = albumName = coverImage = description = tags = "";
                publishYear = price = 0;
                musicInputs = [""];
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

        {#each musicInputs as url, index}
            <div class="input-group">
                <input
                    type="text"
                    bind:value={musicInputs[index]}
                    placeholder="Music URL"
                />
                {#if musicInputs.length > 1}
                    <button
                        type="button"
                        class="icon-btn"
                        on:click={() => removeMusicField(index)}>🗑</button
                    >
                {/if}
            </div>
        {/each}

        <button type="button" class="secondary-btn" on:click={addMusicField}
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
        <input type="text" bind:value={artist} placeholder="Artist" />
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
        <input
            type="number"
            bind:value={publishYear}
            placeholder="Publish Year"
        />
        <input type="number" bind:value={price} placeholder="Price" />

        {#each musicInputs as url, index}
            <div class="input-group">
                <input
                    type="text"
                    bind:value={musicInputs[index]}
                    placeholder="Music URL"
                />
                {#if musicInputs.length > 1}
                    <button
                        type="button"
                        class="icon-btn"
                        on:click={() => removeMusicField(index)}>🗑</button
                    >
                {/if}
            </div>
        {/each}

        <button type="button" class="secondary-btn" on:click={addMusicField}
            >➕ Add Another</button
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
