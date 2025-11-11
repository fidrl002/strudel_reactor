function SaveLoadJson() {

    return (
        <div className="card">
            <h5 className="card-header">Save or load song data (.json file):</h5>
            <div className="card-body">
                <div className="d-flex justify-content">
                    <button id="Save" className="btn btn-primary me-1" >Save</button>
                    <button id="Load" className="btn btn-primary" >Load</button>
                </div>
            </div>
        </div>
    );
}

export default SaveLoadJson;