
// contains panel 4 - controls for changing music settings
export function Controls() {

    return (
        <div className="m-2">
            <div className="mb-4 fs-5">
                <label htmlFor="master-volume" className="form-label text-center">Master Volume</label>
                <input type="range" className="form-range secondary" min="0" max="1" step="0.05" id="master-volume"/>
            </div>

            <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">CPM/Speed:</span>
                <input type="text" className="form-control" placeholder="Cycles per minute" aria-label="Set-CPS" aria-describedby="basic-addon1" />
                <button className="btn btn-primary" type="button" >Set</button>
            </div>


            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                            Instrument Switches (on or off)
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">

                            <h5>Instrument switches</h5>
                            <p>Turn selected instrument groups on or off</p>

                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" name="p1-switch" id="p1-switch" defaultChecked />
                                <label className="form-check-label" htmlFor="p1-switch">p1</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" name="p2-switch" id="p2-switch" defaultChecked />
                                <label className="form-check-label" htmlFor="p2-switch">p2</label>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Pattern Selection
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Song Selection
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Controls;