
// contains panel 2b - play buttons
// uses bootstrap icons (svg elements)
export function PlayButtons({ onPlay, onStop }) {
    return (
        <div className="d-flex gap-2">
            <input type="radio" id="play" name="play-options" className="btn-check" onClick={onPlay} />
            <label className="btn btn-outline-success" htmlFor="play">
                Play
                </label>

            <input type="radio" id="stop" name="play-options" className="btn-check" onClick={onStop} />
            <label className="btn btn-outline-danger" htmlFor="stop">
                Stop
                </label>
        </div>
    );
}

export default PlayButtons;