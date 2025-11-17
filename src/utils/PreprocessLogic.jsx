
// pipeline for processing song text with volume, cpm, instrument on/off buttons etc
export function Preprocess({ inputText, volume, cpm, instruments, pattern, lpf, delay, room }) {

    // stop errors with no text to process
    if (inputText === "") {
        inputText = "empty";
    }

    let outputText = inputText;

    // find text starting from "aword:" until next colon or "/" character
    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;
    let matches = [];

    while ((m = regex.exec(outputText)) !== null) {
        // Necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // Result can be accessed through the `m`-variable
        m.forEach((match, groupIndex) => {
            matches.push(match)
        });
    }

    // process each setting
    if (cpm) {
        outputText = ProcessCPM({ outputText, cpm });
    }
    if (volume) {
        outputText = ProcessVolume({ outputText, matches, volume });
    }
    if (instruments) {
        outputText = ProcessHush({ outputText, instruments });
    }
    if (pattern !== null && pattern !== undefined) {
        outputText = ProcessCurrentPattern({ outputText, pattern });
    }

    // sound effects
    if (lpf > 0) {
        outputText = outputText + (`\nall(x => x.lpf(${lpf}))`);
    }
    if (delay > 0) {
        outputText = outputText + (`\nall(x => x.delay(${delay}))`);
    }
    if (room > 0) {
        outputText = outputText + (`\nall(x => x.room(${room}))`)
    }

    return outputText;
}


function ProcessVolume({ outputText, matches, volume }) {

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]), outputText);

    return matches3;
}

function ProcessCPM({ outputText, cpm }) {

    outputText = outputText.replace(/setcpm\(([\d.]+)\)/, `setcpm(${cpm})`);

    return outputText;
}

function ProcessHush({ outputText, instruments }) {

    // iterate over each instrument to get their state (on/off)
    for (const [instrument, state] of Object.entries(instruments)) {

        // set the state in the app (instrument names are all unique/dynamic unless named the same by the user)
        if (state) {
            outputText = outputText.replaceAll(`_${instrument}:`, `${instrument}:`)
        }
        else {
            outputText = outputText.replaceAll(`${instrument}:`, `_${instrument}:`);
        }
    }

    return outputText;
}


function ProcessCurrentPattern({ outputText, pattern }) {

    // replace currently playing pattern with new selected one
    outputText = outputText.replace((/(const pattern = )\d+/), `const pattern = ${pattern}`);

    return outputText;
}

export default Preprocess;
