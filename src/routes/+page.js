export async function load ({fetch}){
    const res = await fetch ('/data/songs.json');
    const songs = await res.json();
    console.log("initial get data: ");
    console.log(songs);
    return {songs};
}