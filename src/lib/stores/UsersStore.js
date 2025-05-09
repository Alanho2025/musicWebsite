import { writable } from "svelte/store";

// 🔑 Define a unique key to identify this store in localStorage
const LOCAL_STORAGE_KEY = "users-store";

/**
 * Creates a Svelte store that syncs with localStorage using Map
 * This allows user data to persist across page reloads.
 */
function createUsersStore() {
    // 🧱 Default value: an empty Map
    let initial = new Map();

    // 🧠 Only run localStorage logic in the browser (SSR-safe)
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
            // 📦 Try to load stored data from localStorage
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                // 🗃️ Convert JSON string back into a Map
                initial = new Map(JSON.parse(stored));
            }
        } catch (e) {
            // 🐞 Log any errors that happen while reading
            console.error("❌ Failed to load from localStorage:", e);
        }
    }

    // 📡 Create a Svelte writable store with the initial value
    const store = writable(initial);

    // 🧠 Subscribe only in the browser to avoid issues during SSR
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        store.subscribe((value) => {
            try {
                // 💾 Save current state of the Map to localStorage
                localStorage.setItem(
                    LOCAL_STORAGE_KEY,
                    JSON.stringify(Array.from(value.entries()))
                );
            } catch (e) {
                // 🐞 Catch errors from localStorage write (e.g. quota exceeded)
                console.error("❌ Failed to write to localStorage:", e);
            }
        });
    }

    // 🚀 Return the store so it can be used throughout your app
    return store;
}

// 📤 Export the store for use in components
export const UsersStore = createUsersStore();
