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
        const selected = shuffled.slice(0, 5); // 取前6個不重複
        images = selected.map((song) => song?.poster ?? "");
    });
    console.log(images);

    import { goto } from "$app/navigation";
    function gotoMusicPage() {
        goto("/MusicPlayer");
    }
    function gotoAlbumPage() {
        goto("/AlbumList");
    }
    function gotoBuyPage() {
        goto("/BuyAlbum");
    }
</script>

<svelte:head>
    <title>Luminaria music Website</title>
</svelte:head>
<h1>Luminaria music Website</h1>

<div class="row">
    <div class="card">
        <h3>Want to listen to music?</h3>
        <p>Click below and dive into sonic bliss.</p>
        <button on:click={gotoMusicPage}>Explore</button>
    </div>
    <img
        class="cardimage"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1gg9enx2LsZy-R1PazMAo0Bj9wuszKMkCg&s"
        alt="musicplayer"
    />
</div>

<div class="row">
    <img
        class="cardimage"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbX3mrJMgCyPlVHAT1LgX7Lo9dh6mVBFrBaw&s"
        alt="Kpop Album"
    />
    <div class="card" style="background-color: #f3e5f5;">
        <h3>Ready to vibe with our beats?</h3>
        <p>Step into a world of sound that speaks to your soul.</p>
        <button on:click={gotoAlbumPage}>Explore</button>
    </div>
</div>

<div class="row">
    <div class="card" style="background-color: #ffe0e6;">
        <h3>Love it? Own it.</h3>
        <p>Find your favorite albums and bring them home today.</p>
        <button on:click={gotoBuyPage}>Explore</button>
    </div>
    <img
        class="cardimage"
        src="https://i.ytimg.com/vi/NS5biTJPgnI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHoCYAC0AWKAgwIABABGGUgWChSMA8=&rs=AOn4CLBfhr1rvdrXcUWS0JjHJARB4fCasQ"
        alt="music shopping cart"
    />
</div>

<h1>Suggested Albums</h1>
<div class="imageset">
    {#each images as image}
        <img src={image} alt="Album Poster" />
    {/each}
</div>

<style>
    body {
        font-family: "Segoe UI", sans-serif;
        background-color: #f9f9fb;
        margin: 0;
        padding: 0;
    }

    h1 {
        text-align: center;
        font-size: 4rem;
        margin: 2rem 0 1rem;
        color: #333;
    }

    h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: #555;
    }

    button {
        background-color: #4f8ef9;
        color: white;
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #3a6edc;
    }

    .row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4rem;
        padding: 2rem 0;
        max-width: 1200px;
        margin: 0 auto;
        flex-wrap: wrap;
    }

    .card {
        flex: 1 1 40%;
        max-width: 500px;
        background: white;
        border-radius: 3rem;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 300px;
    }

    .cardimage {
        border-radius: 1rem;
        object-fit: cover;
        width: 30rem;
        height: 25rem;
    }

    .imageset {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1.5rem;
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .imageset img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 0.75rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
</style>
