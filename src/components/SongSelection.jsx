import { stranger_tune, friendship, coastline } from '../tunes';
import { useState } from "react";

// use to select a premade tune to play from a dropdown selection
// returns a string of the song
function SongSelection({ onSelect }) {

    const [selectedSong, setSelectedSong] = useState("stranger_tune"); // set default tune to stranger_tune

    return (
        <div className="card mb-2">
            <h5 className="card-header">Select a pre-made song to play: </h5>
            <div className="card-body">
                <div className="dropdown d-flex">
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
                        <li>
                            <button className="dropdown-item" onClick={() => { onSelect(coastline); setSelectedSong("coastline") }} >coastline</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => { onSelect(":-)"); setSelectedSong("none") }} >none - start fresh!</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SongSelection;