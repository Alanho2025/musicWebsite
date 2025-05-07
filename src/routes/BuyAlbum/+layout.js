export async function load({ fetch }) {
    let res = await fetch('/data/songs.json');
    let songs = await res.json();
    console.log(songs);
    return { songs };
}