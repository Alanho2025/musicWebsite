<script>
    import { songsStore, sortingSongsStore } from "$lib/stores/SongsRestore.js";
    import { goto } from "$app/navigation";

    $: selected = $songsStore.slice(0); // reactive
    $: nestedArtists = selected.map((song) => song.artist);
    $: Artists = [...new Set(nestedArtists.flat())];

    function choose(Artist) {
        if (Artist === "all") {
            sortingSongsStore.set($songsStore);
            return;
        }
        const filtered = $songsStore.filter((song) => song.artist === Artist);
        sortingSongsStore.set(filtered);
        if (filtered.length > 0) {
            goto(`/AlbumList/${filtered[0].id}`);
        }
    }
</script>

<div class="button-group">
    <button on:click={() => choose("all")}>All</button>
    {#each Artists as Artist}
        <button on:click={() => choose(Artist)}>{Artist}</button>
    {/each}
</div>

<style>
    .button-group {
        display: flex;
        flex-wrap: wrap; /* 換行時保持彈性 */
        gap: 0.5rem; /* 按鈕間距一致 */
        justify-content: center; /* 可以改成 space-between/around */
        margin-top: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        flex-shrink: 0; /* 不讓按鈕被壓縮 */
        background-color: burlywood;
    }
</style>
