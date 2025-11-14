import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // for accordion
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import TextProcessing from './components/TextProcessing';
import PlayButtons from './components/PlayButtons';
import Controls from './components/Controls';
import D3Graph from './components/D3Graph';
import DarkModeSwitch from './components/DarkModeSwitch';
import { Preprocess } from './utils/PreprocessLogic';
import SaveLoadJson from './components/SaveLoadJson';
import SongSelection from './components/SongSelection';
import { ExtractSongCPM, ExtractInstrumentLabels } from './utils/ExtractFromSong';

let globalEditor = null;

export default function StrudelDemo() {

    const hasRun = useRef(false);

    // handle Play button
    // processes the songText to update volume, cpm and instrument states
    const handlePlay = () => {
        try {
            let outputText = Preprocess({ inputText: songText, volume: volume, cpm: cpm, instruments: instruments });
            globalEditor.setCode(outputText);
            globalEditor.evaluate()
        }
        catch (e) {
            console.log(e);
        }
    }

    // handle Stop button
    const handleStop = () => {
        globalEditor.stop()
    }


    // ---D3 GRAPH--- //
    // for D3 graph, set default state
    const [musicInput, setMusicInput] = useState("");

    // uses the event listener already in place, gets data from .log()
    const handleD3Data = () => {

        // get the latest entry to the array of music data only
        const latestIndex = getD3Data().length;
        const latest = getD3Data()[latestIndex - 1];

        // pass down music input as a prop to D3Graph
        setMusicInput(latest);
    }


    // ---SONG SELECTION--- //
    // updates both preprocessing textarea and editor area)
    const [songText, setSongText] = useState(stranger_tune) // default

    const handleSelect = (song) => {
        setSongText(song);
    }

    // update the songText code, CPM and instrumentLabels when text preprocessing area is changed
    useEffect(() => {
        if (globalEditor) {
            globalEditor.setCode(songText);
            setCpm(ExtractSongCPM(songText));
            setInstrumentLabels(ExtractInstrumentLabels(songText));

        }
    }, [songText]);


    // ---CONTROLS--- //
    const [state, setState] = useState("stop"); // play state

    const [volume, setVolume] = useState(1);

    const [cpm, setCpm] = useState(() => ExtractSongCPM(songText));

    const handleCPMChange = (cpm) => {
        setCpm(cpm);
    }

    const [instrumentLabels, setInstrumentLabels] = useState(() => ExtractInstrumentLabels(songText));

    const [instruments, setInstruments] = useState({});

    useEffect(() => {
        if (!instrumentLabels.length) return;

        setInstruments(prev => {
            const updated = {};
            instrumentLabels.forEach(label => {
                updated[label] = prev[label] ?? true;
            });
            return updated;
        });
    }, [instrumentLabels]);

    const handleHush = (instruments) => {
        setInstruments(instruments);
    }

    // process volume, cpm and instruments on change
    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume, cpm, instruments, instrumentLabels])


    // ---SAVE & LOAD JSON--- //
    // saves json file with songText, cpm and instrument settings
    const handleSave = () => {
        const saveData = JSON.stringify({ songText, cpm, instruments }, null, 2);

        const blob = new Blob([saveData], {
            type: "application/javascript"
        });

        const url = URL.createObjectURL(blob);

        // create temp <a> element and trigger file download
        const temp = document.createElement("a");
        temp.href = url;
        temp.download = "strudelsong.json"
        document.body.appendChild(temp);
        temp.click();

        // remove element and revoke url
        document.body.removeChild(temp);
        URL.revokeObjectURL(url);
    }

    // loads json file and sets songText, cpm and instrument settings
    const handleLoad = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                TextProcessing("");
                if (data.songText !== undefined) setSongText(data.songText);
                if (data.cpm !== undefined) setCpm(data.cpm);
                if (data.instruments !== undefined) setInstruments(data.instruments);

                let outputText = Preprocess({ inputText: songText, volume: volume, cpm: cpm, instruments: instruments });
                globalEditor.setCode(outputText);

            }
            catch (e) {
                console.error("Invalid JSON file!", e);
            }
        };

        fileReader.readAsText(file);
    };

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            console.log(getD3Data());

            // set a default song on load
            setSongText(stranger_tune);
        }
        if (globalEditor) {
            globalEditor.setCode(songText);
        }
    }, [songText]);


    return (
        <div className="m-4">
            <h1 className="ms-2 mb-4 title-text" ><strong> &#9835;~&#9834; Strudel Demo &#9835;~&#9834; </strong></h1>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <TextProcessing value={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                        <div className="col">
                            <div>
                                <DarkModeSwitch />
                            </div>
                            <div>
                                <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                                <SongSelection onSelect={handleSelect} />
                                <SaveLoadJson onSave={handleSave} onLoad={handleLoad} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <Controls volumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)} onCPMChange={handleCPMChange} inCpm={cpm}
                                instrumentStates={instruments} instrumentLabels={instrumentLabels} onHush={(newInstrumentState) => handleHush(newInstrumentState)} />
                        </div>
                    </div>
                </div>
                <div className="mx-4">
                    <D3Graph input={musicInput} />
                </div>
                <canvas id="roll" hidden></canvas>
            </main >
        </div >
    );
}
