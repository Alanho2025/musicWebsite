<script>
    export let data;
    import { UsersStore } from "$lib/stores/UsersStore.js";
    import { amountsStore } from "$lib/stores/AmountStore.js";
    import { goto } from "$app/navigation";

    amountsStore.update((store) => {
        data.songs.forEach((song) => {
            if (!store.has(song.id)) {
                store.set(song.id, 0);
            }
        });
        return store;
    });

    $: totalprice = data.songs.reduce((sum, song) => {
        const amount = $amountsStore.get(song.id) || 0;
        return sum + amount * song.price;
    }, 0);

    $: currentUser = Array.from($UsersStore.values()).find(
        (user) => user.login_state === true
    );
    let showSignInPopup = false;
    function buyalbum() {
        if (currentUser) {
            goto("/Pay");
        } else {
            showSignInPopup = true;
        }
    }
    function closePopup() {
        showSignInPopup = false;
    }
</script>

<ul>
    <li>Album name</li>
    <li>Price</li>
    <li>Amount</li>
</ul>

{#each data.songs as song (song.id)}
    {#if $amountsStore.get(song.id) !== 0}
        <ul>
            <li>{song.artist} | {song.name}</li>
            <li>{song.price} NZD</li>
            <li>{$amountsStore.get(song.id)}</li>
        </ul>
    {/if}
{/each}
<div class="totalprice">
    <p>Total price: {totalprice.toFixed(2)} NZD</p>
    <button on:click={() => buyalbum()}>Buy</button>
</div>
{#if showSignInPopup}
    <div class="popup-overlay" on:click={closePopup}>
        <div class="popup" on:click|stopPropagation>
            <p>Please sign in first to proceed.</p>
            <button on:click={closePopup}>OK</button>
        </div>
    </div>
{/if}

<style>
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .totalprice {
        display: flex;
        justify-content: end;
    }
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }

    .popup {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        text-align: center;
    }
</style>
