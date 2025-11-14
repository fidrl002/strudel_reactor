import { useState, useEffect } from "react";

// contains panel 4 - controls for changing music settings
export function Controls({ onVolumeChange, onCPMChange, inCpm, instrumentStates, instrumentLabels, onHush }) {

    // --CPM-- //
    const [newCpm, setNewCpm] = useState(inCpm);

    // refresh cpm on song change/textarea refresh
    useEffect(() => {
        setNewCpm(inCpm);
    }, [inCpm]);

    // decrement CPM by 1
    const slowerCPM = () => {

        // prevent negative number or 0
        if (newCpm < 2 || isNaN(newCpm)) {
            onCPMChange(parseInt(inCpm));
        }
        else {
            let cpm = newCpm - 1;
            onCPMChange(cpm);
        }
    };

    // increment CPM by 1
    const fasterCPM = () => {
        if (newCpm < 0 || isNaN(newCpm)) {
            onCPMChange(parseInt(inCpm));
        }
        else {
            let cpm = newCpm + 1;
            onCPMChange(cpm);
        }

    };

    // manually set custom CPM
    const setCPM = () => {
        const cpm = parseInt(newCpm);

        // validation, ensure input value is an int
        if (cpm < 1 || isNaN(cpm)) {
            setNewCpm(parseInt(inCpm));
        }
        else {
            onCPMChange(cpm);
        }
    };


    // --INSTRUMENTS-- //
    // handle instrument toggle (instrument checkbox onChange event)
    const handleInstrumentCheck = (e) => {
        const { name, checked } = e.target; // get the values from input element

        onHush({
            ...instrumentStates,
            [name]: checked, // assign the value to the selected instrument
        });
    };


    return (
        <div className="m-2">
            <div className="mb-4 fs-5">
                <label htmlFor="master-volume" className="form-label text-center">Master Volume</label>
                <input type="range" className="form-range secondary" min="0" max="2" step="0.05" onMouseUp={onVolumeChange} id="master-volume" />
            </div>

            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            <h5>Set CPM</h5>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">

                        <p>Set the cycle speed / change the tempo</p>

                            <div className="input-group mb-2">
                                <span className="input-group-text" id="cpm-increment">Increment CPM</span>
                                <button className="btn btn-danger" type="button" onClick={slowerCPM} >slower</button>
                                <button className="btn btn-primary" type="button" onClick={fasterCPM} >faster</button>
                            </div>

                            <div className="input-group">
                                <span className="input-group-text" id="set-cpm">Set CPM</span>
                                <input type="text" className="form-control" placeholder="Cycles per minute" value={newCpm}
                                    onChange={(e) => setNewCpm(e.target.value)} aria-label="Set-CPM" aria-describedby="set-cpm" />
                                <button className="btn btn-primary" style={{ width: "70px" }} type="button" onClick={setCPM} >Set</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                            <h5>Instrument Switches</h5>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">

                            <p>Turn selected instrument groups on or off</p>

                            {/* Create instrument buttons dynamically */}
                            <div className="d-flex flex-row flex-wrap justify-content-start">

                                {instrumentLabels.map((label) => (
                                    <div key={label}>
                                        <input type="checkbox" style={{ fontSize: "auto" }} id={label} name={label} className="btn-check"
                                            checked={instrumentStates[label] === true} onChange={handleInstrumentCheck} />
                                        <label className="btn btn-outline-primary m-1 square-btn" htmlFor={label} >
                                            {label}
                                        </label>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            <h5>Pattern Selection</h5>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">

                            <p>Controls for changing pattern sets coming soon!</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Controls;