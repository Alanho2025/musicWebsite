<script>
    import "$lib/css/app.css";
    import {page} from "$app/stores";
    $: path = $page.url.pathname;
</script>

<nav>
    <ul>
        <li><a href="/" class:active = {path === "/"}>HomePage</a></li>
        <li><a href="/AlbumList" class:active = {path === "/AlbumList"}>AlbumList</a></li>
        <li><a href="/MusicPlayer" class:active = {path === "/MusicPlayer"}>MusicPlayer</a></li>
        <li><a href="/About" class:active = {path === "/About"}>About</a></li>
    </ul>
   
</nav>
<style>
    
</style>