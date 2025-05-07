<script>
    import { UsersStore } from "$lib/stores/UsersStore.js";
</script>
{#each Array.from($UsersStore.entries()) as [id, user]}
    <p>{id}: {user.first_name} {user.last_name}</p>
{/each}