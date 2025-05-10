import { PUBLIC_SONGS_API}from "$env/static/public";


export async function load ({fetch}){
    const res = await fetch(`${PUBLIC_SONGS_API}`);
    const songs = await res.json();
    console.log("initial get data: ");
    console.log(songs);
    return {songs};
}