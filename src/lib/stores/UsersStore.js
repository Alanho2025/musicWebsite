import { writable } from "svelte/store";

const LOCAL_STORAGE_KEY = "users-store";

function createUsersStore() {
    let initial = new Map();

    // 🔒 檢查是在瀏覽器才讀 localStorage
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                initial = new Map(JSON.parse(stored));
            }
        } catch (e) {
            console.error("❌ Failed to load from localStorage:", e);
        }
    }

    const store = writable(initial);

    // 🔒 同樣只在瀏覽器端訂閱
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        store.subscribe((value) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(value.entries())));
        });
    }

    return store;
}

export const UsersStore = createUsersStore();