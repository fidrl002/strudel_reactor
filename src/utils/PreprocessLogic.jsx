
// pipeline for processing song text with volume, cpm, instrument on/off buttons etc
export function Preprocess({ inputText, volume, cpm }) {

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

    outputText = ProcessCPM({ outputText, cpm });
    outputText = ProcessVolume({ outputText, matches, volume });

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


export default Preprocess;
