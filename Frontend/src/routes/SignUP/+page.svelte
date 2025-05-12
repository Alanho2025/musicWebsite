<script>
    import { UsersStore } from "$lib/stores/UsersStore.js";
    let firstName = "";
    let lastName = "";
    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let birthday = "";
    let gender = "";
    let phone = "";
    let avatar = "";
    let errors = {
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
    };

    function validateEmail(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }

    function validatePassword(value) {
        return value.length >= 6;
    }

    let login_state = false;
    import { goto } from "$app/navigation";
    import { get } from "svelte/store";
    $: passwordsMatch = password === confirmPassword;
    function submit() {
        // 建立一個新的 user 物件
        const newUser = {
            id: crypto.randomUUID(), // 確保每個 user 有獨一無二的 ID
            first_name: firstName,
            last_name: lastName,
            password,
            confirmPassword,
            birthday,
            login_state,
            email,
            gender,
            avatar_url: avatar,
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

    function handleInput() {
        errors.email = !validateEmail(email) ? "Invalid email address" : "";
        errors.password = !validatePassword(password)
            ? "Password must be at least 6 characters"
            : "";
        errors.confirmPassword =
            password !== confirmPassword ? "Passwords do not match" : "";
        errors.avatar =
            avatar && !avatar.startsWith("http")
                ? "Avatar must be a valid image URL"
                : "";
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleInput();

        const hasErrors = Object.values(errors).some((e) => e);
        if (!hasErrors) {
            submit(); // 成功就呼叫原本 submit 邏輯
            alert("Registration successful!");
            goto("/"); // 導向首頁
        } else {
            alert("Please fix the errors before submitting.");
        }
    }
</script>

<svelte:head>
    <title>Sign up</title>
</svelte:head>
<form on:submit={handleSubmit}>
    <h2>Create Account</h2>

    <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" type="text" bind:value={firstName} required />
    </div>

    <div class="form-group">
        <label for="lastName">Last Name</label>
        <input id="lastName" type="text" bind:value={lastName} required />
    </div>

    <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" bind:value={username} required />
    </div>

    <div class="form-group">
        <label for="email">Email</label>
        <input
            id="email"
            type="email"
            bind:value={email}
            on:input={handleInput}
            aria-describedby="email-error"
            required
        />
        {#if errors.email}
            <div id="email-error" class="error">{errors.email}</div>
        {/if}
    </div>

    <div class="form-group">
        <label for="password">Password</label>
        <input
            id="password"
            type="password"
            bind:value={password}
            on:input={handleInput}
            aria-describedby="password-error"
            required
        />
        {#if errors.password}
            <div id="password-error" class="error">{errors.password}</div>
        {/if}
    </div>

    <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
            id="confirmPassword"
            type="password"
            bind:value={confirmPassword}
            on:input={handleInput}
            aria-describedby="confirmPassword-error"
            required
        />
        {#if errors.confirmPassword}
            <div id="confirmPassword-error" class="error">
                {errors.confirmPassword}
            </div>
        {/if}
    </div>

    <div class="form-group">
        <label for="birthday">Birthday</label>
        <input id="birthday" type="date" bind:value={birthday} required />
    </div>

    <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" bind:value={gender} required>
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="nonbinary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
    </div>

    <div class="form-group">
        <label for="phone">Phone</label>
        <input id="phone" type="tel" bind:value={phone} />
    </div>

    <div class="form-group">
        <label for="avatar">Avatar URL</label>
        <input
            id="avatar"
            type="url"
            bind:value={avatar}
            on:input={handleInput}
            aria-describedby="avatar-error"
        />
        {#if avatar}
            <img class="avatar-preview" src={avatar} alt="Avatar preview" />
        {/if}
        {#if errors.avatar}
            <div id="avatar-error" class="error">{errors.avatar}</div>
        {/if}
    </div>

    <div class="form-actions">
        <button type="submit">Register</button>
        <button type="button" on:click={cancel}>Cancel</button>
    </div>
</form>

<style>
    .form-actions {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
    }

    button[type="button"] {
        background: #6c757d;
    }

    button[type="button"]:hover {
        background: #495057;
    }
    form {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1.5rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: #d8a3ef;
    }

    h2 {
        text-align: center;
        margin-bottom: 1rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.25rem;
    }

    input,
    select {
        width: 100%;
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #aaa;
    }

    .error {
        color: red;
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }

    .avatar-preview {
        margin-top: 0.5rem;
        max-width: 100%;
        border-radius: 6px;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        background: #007bff;
        color: white;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 4px;
    }

    button:hover {
        background: #0056b3;
    }
</style>
