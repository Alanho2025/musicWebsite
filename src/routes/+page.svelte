<script>
    import { songsStore } from "$lib/stores/SongsRestore.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import "$lib/css/app.css";
    export let data;
    songsStore.set(data.songs);
    songsStore.subscribe((value) => {
        console.log("songsStore data is");
        console.log(value);
    });
    let images = [];
    onMount(() => {
        const songs = get(songsStore);
        const shuffled = [...songs].sort(() => 0.5 - Math.random()); // 隨機打亂
        const selected = shuffled.slice(0, 7); // 取前6個不重複
        images = selected.map(song => song?.poster ?? "");
    });
    console.log(images);
</script>

<h1>Favorite albums</h1>

<div class="imageset">
    {#each images as image}  
        <img src="{image}" alt="Album Poster" />
    {/each}
</div>

<style>
    img{
        display: block;
        margin: 1rem;
        height:12rem;
        width:14rem;
        box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.3);
    }
    .imageset{
        display:flex;
    }
    
</style>
