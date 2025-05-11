<script>
    import { get } from "svelte/store";
    import { amountsStore } from "$lib/stores/AmountStore.js";
    export let data;

    // 初始化：為每首歌的 id 設定初始值為 0
    amountsStore.update((map) => {
        data.songs.forEach((song) => {
            if (!map.has(song.id)) {
                map.set(song.id, 0);
            }
        });
        return map;
    });

    function reduceValue(id) {
        amountsStore.update((map) => {
            if (map.get(id) > 0) {
                map.set(id, map.get(id) - 1);
            }
            return map;
        });
    }

    function addValue(id) {
        amountsStore.update((map) => {
            map.set(id, (map.get(id) || 0) + 1);
            return map;
        });
    }
</script>
<h1>Buy Album</h1>
<p>You can modify your amount to add into cart</p>
<div class="mainLayout">
    {#each data.songs as song (song.id)}
        <div class="songCard">
            <h2>{song.artist} | {song.name}</h2>
            <img src={song.poster} alt="poster" />
            <p>Price: {song.price} NZD</p>
            <div class="flexLayout">
                <p>Type amount:</p>
                <input
                    type="number"
                    value={$amountsStore.get(song.id)}
                    min="0"
                    on:input={(e) =>
                        amountsStore.update((map) => {
                            map.set(song.id, parseInt(e.target.value) || 0);
                            return map;
                        })}
                />
            </div>
            <div class="flexLayout">
                <button on:click={() => reduceValue(song.id)}> - </button>
                <p>{$amountsStore.get(song.id)}</p>
                <button on:click={() => addValue(song.id)}> + </button>
            </div>
        </div>
    {/each}
</div>
<div>
    <slot />
</div>
<style>
    p {
        text-align: center;
    }
    .flexLayout {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 0.5rem;
    }
    .mainLayout {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    img {
        width: 20rem;
        height: 20rem;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .songCard {
        box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.3);
        margin: 1rem;
        background: linear-gradient(145deg, #d0aed3, #e683ca);
        padding: 1rem;
    }
</style>
