<script>
    import { UsersStore } from "$lib/stores/UsersStore.js";
    let first_name = "";
    let last_name = "";
    let password = "";
    let check_password = "";
    let email = "";
    let gender = "";
    let avatar_url = "";
    let phone = "";
    let username = "";
    let birthday = "";
    let login_state = false;
    import { goto } from "$app/navigation";
    import { get } from "svelte/store";
    $: passwordsMatch = password === check_password;
    function submit() {
        // 建立一個新的 user 物件
        const newUser = {
            id: crypto.randomUUID(), // 確保每個 user 有獨一無二的 ID
            first_name,
            last_name,
            password,
            check_password,
            birthday,
            login_state,
            email,
            gender,
            avatar_url,
            phone,
            username,
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
<svelte:head>
    <title>Sign up</title>
</svelte:head>
<div class="mainLayout">
    <form on:submit|preventDefault={submit}>
        <div class="labelLayout">
            <label>First Name:</label> <input bind:value={first_name} />
            <label>Last Name:</label> <input bind:value={last_name} />
        </div>
        <div class="labelLayout">
            <label for="input-username">Username:</label>
            <input
                id="input-username"
                type="text"
                placeholder="username"
                name="username"
                required
                autocomplete="username"
                bind:value={username}
            />
            {#if username.length <= 6}
                <span
                    >usernames should be at least four characters in length</span
                >
            {/if}
        </div>

        <div class="labelLayout">
            <label for="input-password">Password:</label>
            <input
                id="input-password"
                type="password"
                name="password"
                required
                autocomplete="new-password"
                bind:value={password}
            />
            {#if password.length <= 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)}
                <span
                    >Password should be at least 6 characters in length and have
                    at least one uppercase letter, lowercase letter, number, and
                    symbol.</span
                >
            {/if}
        </div>
        <div class="labelLayout">
            <label for="repeat-password">Repeat Password:</label>
            <input
                id="repeat-password"
                type="password"
                name="repeatPassword"
                required
                autocomplete="new-password"
                bind:value={check_password}
            />
        </div>
        {#if !passwordsMatch}
            <span>Passwords must match!</span>
        {/if}
        <div class="labelLayout">
            <label for="input-email">Email:</label>
            <input
                id="input-email"
                type="email"
                placeholder="example@mail.com"
                name="email"
                required
                bind:value={email}
            />
            {#if email.length > 0 && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
                <span>❌ Please enter a valid email address.</span>
            {/if}
        </div>
        <div class="labelLayout">
            <label>Gender:</label>
            <select bind:value={gender}>
                <option>Male</option>
                <option>Female</option>
                <option>Gender diversity</option>
            </select>
        </div>
        <div class="labelLayout">
            <label for="input-avatar">Avatar URL:</label>
            <input
                id="input-avatar"
                type="url"
                name="avatar_url"
                placeholder="https://example.com/avatar.png"
                bind:value={avatar_url}
            />
            {#if avatar_url.length > 0 && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(avatar_url)}
                <span
                    >⚠️ Avatar URL must be a valid image link (jpg/png/gif/webp)</span
                >
            {/if}
            {#if avatar_url && /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(avatar_url)}
                <img
                    src={avatar_url}
                    alt="Avatar Preview"
                    style="width: 100px; height: auto;"
                />
            {/if}
        </div>
        <div class="labelLayout">
            <label>Phone:</label> <input bind:value={phone} />
            {#if phone.length !== 11 || !/^\d{11}$/.test(phone)}
                <span>Phone should be 11 number in length</span>
            {/if}
        </div>

        <div class="labelLayout">
            <label for="input-birthday">Birthday:</label>
            <input
                id="input-birthday"
                type="date"
                name="birthday"
                required
                bind:value={birthday}
            />
        </div>
        <div class="buttonLayout">
            <button type="button" on:click={() => submit()}> Submit</button>
            <button type="button" on:click={() => cancel()}> Cancel</button>
        </div>
    </form>
</div>

<style>
    span {
        font-size: 1.5rem;
        color: red;
    }
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
