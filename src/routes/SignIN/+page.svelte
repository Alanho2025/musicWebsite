<script>
    import { goto } from "$app/navigation";
    import { UsersStore } from "$lib/stores/UsersStore.js";
    import { get } from 'svelte/store';
    let username;
    let password;
    console.table([...get(UsersStore).values()]);
    function submit() {
        let found = false;
        UsersStore.update(usersMap => {
            const newMap = new Map(usersMap); // 必須建立新的 map 才會觸發更新

            for (let [id, user] of usersMap.entries()) {
                if (user.username === username && user.password === password) {
                    const updatedUser = {
                        ...user,
                        login_state: true
                    };
                    newMap.set(id, updatedUser);
                    found = true;
                    console.log("✅ Login success:", updatedUser);
                    break; // 停止迴圈
                }
            }

            if (!found) {
                alert("❌ Account or password is incorrect.");
            }

            return newMap;
        });

        if (found) goto("/");
    }
    function cancel() {
        goto("/");
    }
</script>

<div class="mainLayout">
    <label>username:</label>
    <input bind:value={username} />
    <label>password:</label>
    <input bind:value={password} />

    <button on:click={() => submit()}> Submit</button>
    <button on:click={() => cancel()}> Cancel</button>
</div>

<style>
    .mainLayout {
        margin-top: 20rem;
        margin-left: 20rem;
        font-size: 2rem;
    }
</style>
