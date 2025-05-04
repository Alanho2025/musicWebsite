<script>
    import FlowSong from "$lib/components/FlowSong.svelte";
    import TagFlow from "$lib/components/TagFlow.svelte";
</script>

<div class="tagLayout">
    <TagFlow />
</div>
<div class="fullLayout">
    <FlowSong />
</div>
<style>
    .fullLayout {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>