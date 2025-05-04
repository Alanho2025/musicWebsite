import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { sortingSongsStore } from '$lib/stores/SongsRestore.js';

export function load() {
    const list = get(sortingSongsStore);
    if (list.length > 0) {
        throw redirect(307, `/MusicPlayer/${list[0].id}`);
    }
}