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

let globalEditor = null;

//const handleD3Data = (event) => {
//    console.log(event.detail);
//};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    // handle Play button
    const handlePlay = () => {
        try {
            let outputText = Preprocess({ inputText: songText, volume: volume });
            globalEditor.setCode(outputText);
            globalEditor.evaluate()
        }
        catch (e) {
            console.log("Nothing to process!");
        }

    }

    // handle Stop button
    const handleStop = () => {
        globalEditor.stop()
    }


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


    // for song selection, using imported song variables
    // updates both preprocessing textarea and editor area)
    const [songText, setSongText] = useState("") // default

    const handleSelect = (song) => {
        setSongText(song);
    }

    // volume slider state
    const [volume, setVolume] = useState(1);

    // play state
    const [state, setState] = useState("stop");

    // when volume slider updated
    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume])


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
        globalEditor.setCode(songText);
    }, [songText]);


    return (
        <div className="m-4">
            <h1 className="ms-2 mb-4"> ~&#9835;~&#9834;~ Strudel Demo ~&#9834;~&#9835;~</h1>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <TextProcessing defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                        <div className="col">
                            <div>
                                <DarkModeSwitch />
                            </div>
                            <div>
                                <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                                <SongSelection onSelect={handleSelect} />
                                <SaveLoadJson />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <Controls volumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)} />
                        </div>
                    </div>
                </div>
                <D3Graph input={musicInput} />
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}
