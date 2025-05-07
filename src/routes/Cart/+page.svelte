<script>
    export let data;
    import { amountsStore } from "$lib/stores/AmountStore.js";
    amountsStore.update((store) => {
        data.songs.forEach((song) => {
            if (!store.has(song.id)) {
                store.set(song.id, 0);
            }
        });
        return store;
    });
</script>

<ul>
    <li>Album name</li>
    <li>Prise</li>
    <li>Amount</li>
</ul>

{#each data.songs as song (song.id)}
    {#if $amountsStore.get(song.id) !== 0}
        <ul>
            <li>{song.artist} | {song.name}</li>
            <li>{song.prise} NZ dollars</li>
            <li>{$amountsStore.get(song.id)}</li>
        </ul>
    {/if}
{/each}

<style>
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>
