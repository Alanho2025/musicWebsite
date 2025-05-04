<script>
	import {
		favoriteSongsStore,
		sortingSongsStore,
		songsStore
	} from "$lib/stores/SongsRestore.js";
	import { get } from "svelte/store";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import TagMusic from "$lib/components/TagMusic.svelte";
	import "$lib/css/app.css";

	let newSongdata = [];

	// ✅ 初始化排序歌曲（如果尚未初始化）
	onMount(() => {
		const current = get(sortingSongsStore);
		if (current.length === 0) {
			const original = get(songsStore);
			const initialized = original.map((item) => ({
				...item,
				isClicked: false,
			}));
			sortingSongsStore.set(initialized);

			// ✅ 自動跳轉到第一首歌
			if (browser && initialized.length > 0) {
				goto(`/MusicPlayer/${initialized[0].id}`);
			}
		}
	});

	// ✅ 處理 SSR 時資料可能不含 isClicked 的補丁（保險用）
	$: {
		const current = get(sortingSongsStore);
		if (current.length > 0 && !current[0].hasOwnProperty("isClicked")) {
			const initialized = current.map((item) => ({
				...item,
				isClicked: false,
			}));
			sortingSongsStore.set(initialized);
		}
	}

	// ✅ reactive binding 到 local data
	$: newSongdata = $sortingSongsStore;

	// ✅ toggle 喜歡的邏輯
	function toggleHeart(id) {
		const index = newSongdata.findIndex((item) => item.id === id);
		if (index !== -1) {
			newSongdata[index].isClicked = !newSongdata[index].isClicked;
			newSongdata = [...newSongdata]; // trigger reactivity
			sortingSongsStore.set(newSongdata);
			songsStore.set(newSongdata);
			favoriteSongsStore.set(newSongdata.filter((item) => item.isClicked));
		}
	}
</script>
<h1>Music player</h1>
<p>Select sidebar to listen the music.</p>
<p>Press heart to get your favorite song list.</p>
<TagMusic />
<div class="mainLayout">
	<div class="sidebar">
		{#each $sortingSongsStore as song (song.id)}
			<div class="flex">
				<a
					class="songCard"
					class:active={$page.params.id == song.id}
					href="/MusicPlayer/{song.id}"
					title={song.name}
				>
					{song.artist.toUpperCase()} &nbsp;|&nbsp; {song.name.toUpperCase()}
				</a>
				<button on:click={() => toggleHeart(song.id)}>
					{#if song.isClicked}
						<img src="/data/images/redheart.jpg" alt="like" />
					{:else}
						<img src="/data/images/blankheart.jpeg" alt="nolike" />
					{/if}
				</button>
			</div>
		{/each}
	</div>
	<div class="mainVideo">
		<slot />
	</div>
</div>

<style>
	button {
		display: block;
		margin-left: auto;
		padding: 0rem 1rem;
		margin: 0 0.5rem;
	}
	img {
		width: 20px;
	}
	.flex {
		display: flex;
		flex-direction: row;
		box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.3);
		justify-content: space-between;
	}
	.mainVideo {
		margin-left: auto;
		margin-right: auto;
		margin-top: 5rem;
	}
	.mainLayout {
		display: flex;
		flex-direction: row;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		width: 20rem;
		gap: 1rem;
		margin-top: 1rem;
		text-align: center;
	}
	a {
		text-decoration: none;
	}
	p{
		text-align: center;
	}
</style>
