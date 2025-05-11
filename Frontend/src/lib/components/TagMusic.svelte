<script>
	import {
		songsStore,
		sortingSongsStore,
		favoriteSongsStore
	} from "$lib/stores/SongsRestore.js";

	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";

	// 初始化排序歌曲
	function initOrUpdateSortingSongs(newData) {
		const initialized = newData.map((item) => ({
			...item,
			isClicked: item.isClicked ?? false, // 保留原狀態或設為 false
		}));
		sortingSongsStore.set(initialized);

		// 導向第一首
		if (browser && initialized.length > 0) {
			goto(`/MusicPlayer/${initialized[0].id}`, { replaceState: true });
		}
	}

	$: selected = $songsStore.slice(); // reactive
	$: nestedArtists = selected.map((song) => song.artist);
	$: Artists = [...new Set(nestedArtists.flat())];

	function choose(Artist) {
		if (Artist === "favorite") {
			const favorites = $favoriteSongsStore;
			initOrUpdateSortingSongs(favorites);
			return;
		}

		if (Artist === "all") {
			const allSongs = $songsStore;
			initOrUpdateSortingSongs(allSongs);
			return;
		}

		const filtered = $songsStore.filter((song) => song.artist === Artist);
		initOrUpdateSortingSongs(filtered);
	}
</script>

<div class="button-group">
    <button on:click={() => choose("all")}>All</button>
    {#each Artists as Artist}
        <button on:click={() => choose(Artist)}>{Artist}</button>
    {/each}
    <button on:click={() => choose("favorite")}>Favorite Song</button>
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
