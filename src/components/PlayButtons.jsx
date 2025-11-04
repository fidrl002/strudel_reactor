
// contains panel 2b - play buttons
export function PlayButtons({ onPlay, onStop }) {
  return (
      <>
          <div className="my-2">
              <button id="play" className="btn btn-outline-primary me-2" onClick={onPlay}>Play</button>
              <button id="stop" className="btn btn-outline-danger" onClick={onStop}>Stop</button>
          </div>

      </>
  );
}

export default PlayButtons;