<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { get } from "svelte/store";
	import { songsStore, sortingSongsStore } from "$lib/stores/SongsRestore.js";
	import { goto } from "$app/navigation";

	let sortingSong = null; // 用 local 狀態管理選中的歌曲
	let initialized = false;
	let newComment = "";
	let replyStates = {};
	let replyInputs = {}; // 控制每條留言的回覆輸入值
	// 自動追蹤頁面 ID
	$page;
	$songsStore;
	$sortingSongsStore;

	// 當頁面初始載入（只跑一次）
	onMount(() => {
		const id = get(page).params.id;
		const source =
			get(songsStore).length > 0
				? get(sortingSongsStore)
				: get(songsStore);
		sortingSong = source.find((song) => String(song.id) === id);
		initialized = true;
	});

	// reactive 更新（當 id 或 store 改變時）
	$: if (initialized) {
		const id = $page.params.id;
		const source =
			$sortingSongsStore.length > 0 ? $sortingSongsStore : $songsStore;
		sortingSong = source.find((song) => String(song.id) === id);
	}
	function addComment() {
		const id = $page.params.id;
		const newItem = { text: newComment, replies: [] };
		songsStore.update((songs) => {
			return songs.map((song) => {
				if (String(song.id) === id) {
					return {
						...song,
						comment: [...(song.comment || []), newComment],
					};
				}
				return song;
			});
		});
		sortingSong.comment.push(newItem);
		newComment = "";
	}
	function cancel(index) {
		newComment = "";
		replyStates[index] = false;
	}
	function replyComment(index) {
		replyStates[index] = true;
	}
	function addReply(index) {
		const replyText = replyInputs[index];
		if (!replyText.trim()) return;

		sortingSong.comment[index].replies.push(replyText);
		songsStore.update((songs) => {
			return songs.map((song) => {
				if (String(song.id) === $page.params.id) {
					return {
						...song,
						comment: [...sortingSong.comment],
					};
				}
				return song;
			});
		});
		replyInputs[index] = "";
		replyStates[index] = false;
	}

	function goback() {
		const source =
			$sortingSongsStore.length > 0 ? $sortingSongsStore : $songsStore;
		const currentIndex = source.findIndex(
			(song) => String(song.id) === $page.params.id
		);

		if (currentIndex > 0) {
			const previousSongId = source[currentIndex - 1].id;
			goto(`/MusicPlayer/${previousSongId}`);
		}
	}
	function gonext() {
		const source =
			$sortingSongsStore.length > 0 ? $sortingSongsStore : $songsStore;
		const currentIndex = source.findIndex(
			(song) => String(song.id) === $page.params.id
		);

		if (currentIndex < source.length - 1) {
			const nextSongId = source[currentIndex + 1].id;
			goto(`/MusicPlayer/${nextSongId}`);
		}
	}
</script>

{#if sortingSong}
	<div class="buttonToplayout">
		<button on:click={() => goback()}>&larr; Previous</button>
		<button on:click={() => gonext()}>Next &rarr;</button>
	</div>
	<iframe
		width="1200"
		height="600"
		src={sortingSong.music}
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	/>
	<h2>{sortingSong.artist} | {sortingSong.name.toUpperCase()}</h2>
	<div class="commentLayout">
		<h3>Comment</h3>
		<div class="TypeBox">
			<input type="text" bind:value={newComment} />
			<div class="buttonLayout">
				<button on:click={() => cancel()}>Cancel</button>
				<button on:click={() => addComment()}>Comment</button>
			</div>
		</div>

		{#if sortingSong.comment && sortingSong.comment.length > 0}
			{#each sortingSong.comment as comment, index}
				<div class="commentBox">
					<p>{comment.text}</p>
					{#each comment.replies as reply}
						<div class="replyBox">
							<p>{reply}</p>
						</div>
					{/each}

					<div class="buttonLayout">
						<button on:click={() => replyComment(index)}
							>Reply</button
						>
					</div>

					{#if replyStates[index]}
						<input type="text" bind:value={replyInputs[index]} />
						<div class="buttonLayout">
							<button on:click={() => cancelReply(index)}
								>Cancel</button
							>
							<button on:click={() => addReply(index)}
								>Comment</button
							>
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
{:else}
	<p>Cannot find the song!!!</p>
{/if}

<style>
	
	.buttonToplayout {
		display: flex;
		justify-content: space-between; /* 將左右按鈕推到兩側 */
		padding: 0 1rem;
		margin-bottom: 1rem;
	}
	input {
		background-color: #4e342e0f;
		height: 3rem;
		border: none;
	}
	.TypeBox {
		display: flex;
		flex-direction: column;
		box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
		background-color: #4e342e0f;
		border-radius: 2.5rem;
	}
	.commentBox {
		box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
		text-align: center;
		padding: 0.5rem;
	}

	.buttonLayout {
		display: flex;
		flex-direction: row;
		justify-content: right;
	}
	h2 {
		font-size: 2rem;
	}
	.replyBox {
		margin-left: 2rem;
		background-color: #f4f4f4;
		border-left: 3px solid #ccc;
		padding: 0.5rem;
	}
</style>
