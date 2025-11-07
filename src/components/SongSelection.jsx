import { stranger_tune, friendship, koji_kondo, coastline } from '../tunes';
import { useState } from "react";

// use to select a premade tune to play from a dropdown selection
// returns a string of the song
function SongSelection({ onSelect }) {

    const [selectedSong, setSelectedSong] = useState("stranger_tune"); // set default tune to stranger_tune

    return (
        <div className="mb-4">
            <h5>Select a pre-made song to play: </h5>

            <div className="dropdown d-flex mb-3">
                <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedSong ? selectedSong : "Select "}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item" onClick={() => { onSelect(stranger_tune); setSelectedSong("stranger_tune") }} >stranger_tune</button> 
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => { onSelect(friendship); setSelectedSong("friendship") }} >friendship</button>
                    </li>
                    {/*<li>*/}
                    {/*    <button className="dropdown-item" onClick={() => { onSelect(koji_kondo); setSelectedSong("koji_kondo") }} >koji_kondo</button>*/}
                    {/*</li>*/}
                    <li>
                        <button className="dropdown-item" onClick={() => { onSelect(coastline); setSelectedSong("coastline") }} >coastline</button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => { onSelect(":-)"); setSelectedSong("none") }} >none - start fresh!</button>
                    </li>
                </ul>
                {/*<p className="m-3">Song selected: {selectedSong ? selectedSong : "none"}</p>*/}

            </div>
        </div>
    );
}

export default SongSelection;