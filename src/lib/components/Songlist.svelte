<script>
    export let name;
    export let artist;
    export let poster;

    $: artistModify = artist?.toUpperCase();
    $: nameModify = name?.toUpperCase();
</script>

<div class="columnlayout">
    <img src={poster} alt = "song poster">
    <div class ="rowlayout">
        <p>{artistModify} | {nameModify}</p>
    </div>
</div>

<style>
    img{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 20rem;
        height:20rem;
    }
    .columnlayout{
        display:flex;
        flex-direction: column;
    }
    .rowlayout{
        display:flex;
        flex-direction: column;
    }
    p{
        text-align:center;
    }
</style>