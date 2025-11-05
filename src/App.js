import './App.css';
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
import ProcButtons from './components/ProcButtons';
import Controls from './components/Controls';
import D3Graph from './components/D3Graph';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    // for D3 graph, set default state
    const [musicInput, setMusicInput] = useState("");

    // handle Preprocess button
    const handleProc = () => {
        // add controls processing when controls complete

    }

    // handle ProcAndPlay button
    const handleProcAndPlay = () => {
        // add controls processing when controls complete

        globalEditor.evaluate()
    }

    // handle Play button
    const handlePlay = () => {
        globalEditor.evaluate()

    }

    // handle Stop button
    const handleStop = () => {
        globalEditor.stop()
    }

    // uses the event listener already in place
    const handleD3Data = () => {

        // get the latest entry to the array of music data only
        const latestIndex = getD3Data().length;
        const latest = getD3Data()[latestIndex - 1];

        handleInput(latest);
    }

    // pass down music input as a prop to D3Graph
    const handleInput = (input) => {
        setMusicInput(input);
    }

    const [songText, setSongText] = useState(stranger_tune)

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

            document.getElementById('proc').value = stranger_tune
            console.log(getD3Data());

        }
        globalEditor.setCode(songText);
    }, [songText]);


    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <TextProcessing defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <ProcButtons onProc={handleProc} onProcAndPlay={handleProcAndPlay} />
                            <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <Controls />
                        </div>
                    </div>
                </div>
                <D3Graph input={musicInput} />
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}
