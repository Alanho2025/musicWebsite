<script>
    import { sortingSongsStore, songsStore } from "$lib/stores/SongsRestore.js";
    import { page } from "$app/stores";
    import Songlist from "$lib/components/Songlist.svelte";
</script>

{#if $sortingSongsStore.length === 0}
    {#each $songsStore as songStore (songStore.id)}
        <a
            class="songCard"
            class:active={$page.params.id == songStore.id}
            href="/AlbumList/{songStore.id}"
            title={songStore.name}
        >
            <Songlist
                name={songStore.name}
                artist={songStore.artist}
                poster={songStore.poster}
            />
        </a>
    {/each}
{:else}
    {#each $sortingSongsStore as songStore (songStore.id)}
        <a
            class="songCard"
            class:active={$page.params.id == songStore.id}
            href="/AlbumList/{songStore.id}"
            title={songStore.name}
        >
            <Songlist
                name={songStore.name}
                artist={songStore.artist}
                poster={songStore.poster}
            />
        </a>
    {/each}
{/if}

<style>
    .songCard {
        box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.3);
        margin: 1rem;
        background: linear-gradient(145deg, #d0aed3, #e683ca);
    }
</style>
