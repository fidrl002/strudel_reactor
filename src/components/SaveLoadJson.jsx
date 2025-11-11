import { useRef } from "react";

// save and load a json file with songText data
function SaveLoadJson({ onSave, onLoad }) {

    const fileInputRef = useRef(null);

    return (
        <div className="card">
            <h5 className="card-header">Save or load song data (.json file):</h5>
            <div className="card-body">
                <div className="d-flex justify-content">
                    <button id="Save" className="btn btn-primary me-1" onClick={onSave} >Save</button>
                    <button id="Load" className="btn btn-primary" onClick={() => fileInputRef.current.click()} >Load</button>
                    <input type="file" ref={fileInputRef} accept=".json" onChange={onLoad} hidden /> 
                </div>
            </div>
        </div>
    );
}

export default SaveLoadJson;
