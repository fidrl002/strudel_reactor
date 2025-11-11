
// extracts the song's cpm to use for adjustment controls
function ExtractSongCPM(songText) {

    const match = songText.match(/setcpm\(([\d.]+)\)/i);
    if (!match) {
        return 35;
    }
    return Number(match[1]);

}

export default ExtractSongCPM;
