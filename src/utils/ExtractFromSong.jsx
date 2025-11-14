
// extracts the song's cpm to use for adjustment controls
export function ExtractSongCPM(songText) {

    const match = songText.match(/setcpm\(([\d.]+)\)/i);
    if (!match) {
        return 35;
    }
    return Number(match[1]);

}

// extract instrument labels to create dynamic buttons
export function ExtractInstrumentLabels(songText) {

    // stop errors with no text to process
    if (!songText) {
        return [];
    }

    // find a word with a colon at the end
    const regex = /^([a-zA-Z0-9_]+):/gm;

    let m;
    let matches = [];

    while ((m = regex.exec(songText)) !== null) {
        // Necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // get the label WITH the colon to send back to preprocessing
        matches.push(m[0])
    }

    for (const match of matches) {
        console.log(match);
    }

    return matches;
}

export default ExtractSongCPM;
