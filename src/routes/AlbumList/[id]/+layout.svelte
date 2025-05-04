<script>
    import FlowSong from "$lib/components/FlowSong.svelte";
    import Tag from "$lib/components/Tag.svelte";
</script>
<div class="tagLayout">
    <Tag />
</div>
<div class="fullLayout">
    <div class="sideLayout">
        <FlowSong />
    </div>
    <div class="mainContent">
        <slot />
    </div>
</div>

<style>
    .fullLayout{
        display: flex;
        flex-direction: row;
    }
    .sideLayout {
        display: flex;
        flex-direction: column;
        width: 27rem;
    }
    .mainContent{
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
</style>
