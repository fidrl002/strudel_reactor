import { useState, useEffect } from "react";

// contains panel 4 - controls for changing music settings
export function Controls({ onVolumeChange, onCPMChange, inCpm }) {

    const [newCpm, setNewCpm] = useState(inCpm);

    // refresh cpm on song change/textarea refresh
    useEffect(() => {
        setNewCpm(inCpm);
    }, [inCpm]);

    // decrement CPM by 1
    const slowerCPM = () => {

        // prevent negative number or 0
        if (newCpm <= 1) {
            onCPMChange(1);
        }
        else {
            let cpm = newCpm - 1;
            setNewCpm(cpm);
            onCPMChange(cpm);
        }
    };

    // increment CPM by 1
    const fasterCPM = () => {
        let cpm = newCpm + 1;
        setNewCpm(cpm);
        onCPMChange(cpm);
    };

    // manually set custom CPM
    const setCPM = () => {
        if (newCpm <= 1) {
            onCPMChange(1);
        }
        onCPMChange(newCpm);
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
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
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
                                <input type="text" className="form-control" placeholder="Cycles per minute" value={newCpm} onChange={(e) => setNewCpm(Number(e.target.value))} aria-label="Set-CPM" aria-describedby="set-cpm" />
                                <button className="btn btn-primary" style={{ width: "70px" }} type="button" onClick={setCPM} >Set</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                            <h5>Instrument Switches</h5>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">

                            <p>Turn selected instrument groups on or off</p>

                            <input type="checkbox" id="drums" name="drums" className="btn-check" />
                            <label className="btn btn-outline-primary me-1 square-btn" htmlFor="drums">
                                Drums
                            </label>
                            <input type="checkbox" id="bass" name="bass" className="btn-check" />
                            <label className="btn btn-outline-primary me-1 square-btn" htmlFor="bass">
                                Bass
                            </label>
                            <input type="checkbox" id="arp" name="arp" className="btn-check" />
                            <label className="btn btn-outline-primary me-1 square-btn" htmlFor="arp">
                                Arp
                            </label>

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
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