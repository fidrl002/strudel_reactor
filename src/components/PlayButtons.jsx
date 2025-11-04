
// contains panel 2b - play buttons
// uses bootstrap icons (svg elements)
export function PlayButtons({ onPlay, onStop }) {
    return (
        <div className="d-flex gap-2">
                <input type="radio" id="play" name="play-options" className="btn-check" autocomplete="off" onClick={onPlay} />
                <label className="btn btn-outline-success" for="play">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg> Play
                </label>

            <input type="radio" id="stop" name="play-options" className="btn-check" autocomplete="off" onClick={onStop} />
            <label className="btn btn-outline-danger" for="stop">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5" />
                </svg> Stop
                </label>
        </div>
    );
}

export default PlayButtons;