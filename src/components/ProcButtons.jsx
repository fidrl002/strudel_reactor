
// contains panel 2a - processing buttons
export function ProcButtons({ onProc, onProcAndPlay }) {

    return (
        <div className="my-2">
            <button id="process" className="btn btn-outline-primary me-2" onClick={onProc}>Preprocess</button>
            <button id="process_play" className="btn btn-outline-primary" onClick={onProcAndPlay}>Proc & Play</button>
        </div>
    )
}

export default ProcButtons;