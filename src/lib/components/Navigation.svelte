<script>
    import "$lib/css/app.css";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { UsersStore } from "$lib/stores/UsersStore.js";
    import { get } from "svelte/store";

    $: path = $page.url.pathname;

    $: currentUser = Array.from($UsersStore.values()).find(
        (user) => user.login_state === true
    );

    $: currentUserImage = currentUser?.avatar_url;

    function gotoSignUPPage() {
        goto(`/SignUP`);
    }

    function gotoSignINPage() {
        goto(`/SignIN`);
    }

    function logout() {
        UsersStore.update((usersMap) => {
            const newMap = new Map(usersMap);
            for (let [id, user] of usersMap.entries()) {
                if (user.login_state) {
                    newMap.set(id, { ...user, login_state: false });
                    break;
                }
            }
            return newMap;
        });
        goto("/");
    }
</script>

<nav>
    <ul>
        <div style="display:flex; flex-direction:row">
            <li>
                <a href="/" class:active={path === "/"}
                    ><img
                        src="data/images/mediahomepage.PNG"
                        alt="web sign"
                    /></a
                >
            </li>
            <li><a href="/" class:active={path === "/"}>HomePage</a></li>
            <li><a href="/About" class:active={path === "/About"}>About</a></li>
            <li>
                <a href="/AlbumList" class:active={path === "/AlbumList"}
                    >AlbumList</a
                >
            </li>
            <li>
                <a href="/MusicPlayer" class:active={path === "/MusicPlayer"}
                    >MusicPlayer</a
                >
            </li>
            <li>
                <a href="/BuyAlbum" class:active={path === "/BuyAlbum"}
                    >Buy Album</a
                >
            </li>
            <li><a href="/Cart" class:active={path === "/Cart"}>Shopping Cart</a></li>
        </div>

        <div class="buttonlayout">
            {#if currentUser}
                <li>
                    <a href="/Userlist" class:active={path === "/Userlist"}
                        >UserList</a
                    >
                </li>
                <li>
                    {#if currentUserImage}
                        <img src={currentUserImage} alt="user-head" />
                    {:else}
                        <img src="/default-avatar.png" alt="default avatar" />
                    {/if}
                </li>
                <li><button on:click={logout}>Log Out</button></li>
            {:else}
                <li><button on:click={gotoSignUPPage}>SIGN UP</button></li>
                <li><button on:click={gotoSignINPage}>SIGN IN</button></li>
            {/if}
        </div>
    </ul>
</nav>

<style>
    .buttonlayout {
        display: flex;
        flex-direction: row;
        justify-content: end;
        margin-left: auto;
        gap: 1rem;
        align-items: center;
        margin-bottom: 2rem;
    }
    img {
        width: 3.5rem;
    }
</style>
