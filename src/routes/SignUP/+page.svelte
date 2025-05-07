<script>
    import { UsersStore } from "$lib/stores/UsersStore.js";
    let first_name = "";
    let last_name = "";
    let account = "";
    let password = "";
    let check_password = "";
    let birthday;
    let login_state = false;
    import { goto } from "$app/navigation";
    import { get } from 'svelte/store';

    function submit() {
        // 建立一個新的 user 物件
        const newUser = {
            id: crypto.randomUUID(), // 確保每個 user 有獨一無二的 ID
            first_name,
            last_name,
            account,
            password,
            check_password,
            birthday,
            login_state,
        };

        // 更新 UsersStore
        UsersStore.update((usersMap) => {
            usersMap.set(newUser.id, newUser);
            return usersMap;
        });
        console.log("✅ UsersStore contents:", get(UsersStore));
        goto("/");
    }
    function cancel() {
        goto("/");
    }
</script>

<div class="mainLayout">
    <div class="labelLayout">
        <label>First Name:</label> <input bind:value={first_name} />
    </div>
    <div class="labelLayout">
        <label>Last Name:</label> <input bind:value={last_name} />
    </div>
    <div class="labelLayout">
        <label>Account:</label> <input bind:value={account} />
    </div>
    <div class="labelLayout">
        <label>Password:</label> <input bind:value={password} />
    </div>
    <div class="labelLayout">
        <label>Check_password:</label> <input bind:value={check_password} />
    </div>
    <div class="labelLayout">
        <label>Birthday:</label> <input bind:value={birthday} />
    </div>
    <div class="buttonLayout">
        <button on:click={() => submit()}> Submit</button>
        <button on:click={() => cancel()}> Cancel</button>
    </div>
</div>

<style>
    .mainLayout {
        margin-top: 10rem;
        margin-left: 15rem;
        font-size: 3rem;
        display: flex;
        flex-direction: column;
    }
    .labelLayout {
        display: flex;
        flex-direction: row;
        gap: 3rem;
    }
    input {
        height: 3rem;
        width: 20rem;
    }
</style>
