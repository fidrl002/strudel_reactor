
// contains panel 4 - controls for changing music settings
export function Controls({ onVolumeChange }) {

    return (
        <div className="m-2">
            <div className="mb-4 fs-5">
                <label htmlFor="master-volume" className="form-label text-center">Master Volume</label>
                <input type="range" className="form-range secondary" min="0" max="2" step="0.1" onMouseUp={onVolumeChange} id="master-volume" />
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

                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">CPM/Speed:</span>
                                <input type="text" className="form-control" placeholder="Cycles per minute" aria-label="Set-CPM" aria-describedby="basic-addon1" />
                                <button className="btn btn-primary" type="button" >Set</button>
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

                            {/*<div className="form-check form-switch fs-3">*/}
                            {/*    <input className="form-check-input" type="checkbox" name="p1-switch" id="p1-switch" defaultChecked />*/}
                            {/*    <label className="form-check-label" htmlFor="p1-switch">p1</label>*/}
                            {/*</div>*/}
                            {/*<div className="form-check form-switch fs-3">*/}
                            {/*    <input className="form-check-input" type="checkbox" name="p2-switch" id="p2-switch" defaultChecked />*/}
                            {/*    <label className="form-check-label" htmlFor="p2-switch">p2</label>*/}
                            {/*</div>*/}

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