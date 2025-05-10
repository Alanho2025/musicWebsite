<script>
    import { json } from "@sveltejs/kit";
    import {PUBLIC_SONGS_API} from "$env/static/public";
    let music = null;
    let newMusic = "";
    let wantedAlbumName = "";
    let wantedArtist = "";
    let showNewMusicAddPanel = false;
    async function handleSubmitNewMusic() {
        try {
            // 第一步：先抓全部的 songs
            const res = await fetch(PUBLIC_SONGS_API);
            const songs = await res.json();

            // 第二步：找出符合 artist + album name 的 song
            const targetSong = songs.find(
                (song) =>
                    song.artist.toLowerCase() ===
                        wantedArtist.toLowerCase().trim() &&
                    song.name.toLowerCase() ===
                        wantedAlbumName.toLowerCase().trim()
            );

            if (!targetSong) {
                alert("找不到符合的歌曲（可能是歌手或專輯名稱拼錯）");
                return;
            }

            // 第三步：更新該筆資料的 music 陣列
            const updatedMusicList = [...targetSong.music, newMusic];

            // 第四步：發送 PUT 請求更新這筆 song
            const updateRes = await fetch(
                `${PUBLIC_SONGS_API}${targetSong.id}`,
                {
                    method: "PUT", // 或 PATCH，視你後端支援
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...targetSong,
                        music: updatedMusicList,
                    }),
                }
            );

            if (updateRes.ok) {
                showNewMusicAddPanel = true;
                newMusic = "";
            } else {
                const errorText = await updateRes.text();
                alert("upadta fail" + errorText);
            }
        } catch (err) {
            console.error(err);
            alert("Error!!!");
        }
    }
</script>

<!--Form for submitting new songs-->
<form on:submit|preventDefault={handleSubmitNewMusic}>
    <h1>Add new Song to the exist album</h1>
    <label>Album related artist</label>
    <input type="text" bind:value={wantedArtist} />
    <label>Album Name</label>
    <input type="text" bind:value={wantedAlbumName} />
    <label>Add Music URL</label>
    <input type="text" bind:value={newMusic} />
    <button type="submit">Submit</button>
    {#if showNewMusicAddPanel}
        <div class="song-added">
            <span>Song add successfully</span>
            <button
                type="button"
                on:click={() => (showNewMusicAddPanel = false)}>x</button
            >
        </div>
    {/if}
</form>
