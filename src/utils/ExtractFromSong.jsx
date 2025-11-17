
// extracts the song's cpm to use for adjustment controls
export function ExtractSongCPM(songText) {

    const match = songText.match(/setcpm\(([\d.]+)\)/i);
    if (!match) {
        return 35;
    }
    return Number(match[1]);

}

// extract instrument labels to create instrument hush buttons in Controls component
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

        // get the label without the colon to send back to preprocessing
        matches.push(m[1])
    }

    for (const match of matches) {
        console.log(match);
    }

    return matches;
}

// extract patterns list (if present) to create pattern buttons in Controls component
export function ExtractPatterns(songText) {
    if (!songText) {
        return [];
    }

    // get the list of patterns as a string
    const regex = /patterns = \[([\s\S]*?)\]/g;

    let m;
    let matches = [];
    let patternList = "";

    while ((m = regex.exec(songText)) !== null) {
        // Necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        patternList = m[0];
    }

    // get the actual patterns from the list
    const regex2 = /"([^"]*)"/g;

    while ((m = regex2.exec(patternList)) !== null) {
        // Necessary to avoid infinite loops with zero-width matches
        if (m.index === regex2.lastIndex) {
            regex2.lastIndex++;
        }

        matches.push(m[0])
    }

    return matches;
}

// extract the current pattern setting in the song text
export function ExtractCurrentPattern(songText) {

    const match = songText.match(/const pattern = (\d+)/);
    if (match === undefined || match === null) {
        return 0;
    }

    // return captured pattern number
    return match[1];
}

export default ExtractSongCPM;
