
// contains panel 2b - play buttons
// uses bootstrap icons (svg elements)
export function PlayButtons({ onPlay, onStop }) {
    return (
        <div className="mb-4">
            <input type="radio" id="play" name="play-options" className="btn-check" onClick={ onPlay } />
            <label className="btn btn-outline-primary me-1 square-btn" htmlFor="play">
                {/*&#9658;*/} Play
                </label>

            <input type="radio" id="stop" name="play-options" className="btn-check" onClick={onStop} />
            <label className="btn btn-outline-danger me-1 square-btn" htmlFor="stop">
                {/*&#9632;*/} Stop
            </label>
        </div>
    );
}

export default PlayButtons;