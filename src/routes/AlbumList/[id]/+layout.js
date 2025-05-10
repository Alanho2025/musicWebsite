import { PUBLIC_SONGS_API } from "$env/static/public";
export async function load({ fetch, params }) {
    let res = await fetch(`${PUBLIC_SONGS_API}`);
    let all = await res.json();
    const songs = all.find(data => data.id == params.id);
    return { songs };
}