export async function load({ fetch, params }) {
    let res = await fetch('/data/songs.json');
    let all = await res.json();
    const songs = all.find(data => data.id == params.id);
    return { songs };
}