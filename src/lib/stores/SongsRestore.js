import { writable } from "svelte/store";

export let songsStore = writable([]);
export let sortingSongsStore = writable([]);
export let favoriteSongsStore = writable([]);