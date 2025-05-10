import { PUBLIC_SONGS_API } from "$env/static/public";
export async function load({ fetch }) {
    let res = await fetch(`${PUBLIC_SONGS_API}`);
    let songs = await res.json();
    console.log(songs);
    return { songs };
}