
// contains panel 2a - processing buttons
export function ProcButtons({ onProc, onProcAndPlay }) {

    return (
        <div className="btn-group d-flex justify-content-gap mb-1">
            <button id="process" className="btn btn-primary me-1" onClick={onProc}>Preprocess</button>
            <button id="process_play" className="btn btn-primary" onClick={onProcAndPlay}>Proc & Play</button>
        </div>
    )
}

export default ProcButtons;