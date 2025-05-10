<script>
    import { page } from "$app/stores";
    import { songsStore, sortingSongsStore } from "$lib/stores/SongsRestore.js";
    import { derived, get } from "svelte/store";
    // 取得目前頁面的 id
    const id = derived(page, ($page) => $page.params.id);

    // 取得對應的歌曲資料
    const sortingSong = derived(
        [songsStore, sortingSongsStore, id],
        ([$songsStore, $sortingSongsStore, $id]) => {
            const source =
                $sortingSongsStore.length > 0
                    ? $sortingSongsStore
                    : $songsStore;
            return source.find((song) => String(song.id) === $id);
        }
    );
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    let redirected = false;
    $: if (
        !redirected &&
        browser &&
        $sortingSongsStore.length > 0 &&
        !$page.params.id
    ) {
        redirected = true;
        goto(`/AlbumList/${$sortingSongsStore[0].id}`, { replaceState: true });
    }
    $: Uppername = $sortingSong?.name?.toUpperCase();
</script>

{#if $sortingSong}
    <div class="detail">
        <h1>{$sortingSong.artist} | {Uppername}</h1>
        <p>Publish Year : {$sortingSong.publish}</p>
        <img src={$sortingSong.poster} alt="song poster" />
        <p>{$sortingSong.description}</p>
        <div class="tagLayout">
            <p>Tag:</p>
            {#each $sortingSong.tags as tag}
                <p>{tag}</p>
            {/each}
        </div>
        {#each $sortingSong.music as music}
            <div>
                <iframe
                    width="560"
                    height="315"
                    src={music}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                />
            </div>
        {/each}
    </div>
{:else}
    <p>cannot find a song</p>
{/if}

<style>
    .tagLayout {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    .detail {
        margin-left: 3rem;
        text-align: center;
    }
    img {
        width: 30rem;
        height: auto;
    }
    p {
        text-align: center;
    }
</style>
