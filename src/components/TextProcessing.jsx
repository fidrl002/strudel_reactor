
// contains panel 1 - text area with music to process
export function TextProcessing() {
    return (
        <>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea className="form-control" rows="15" id="proc" ></textarea>
        </>
    )
}

export default TextProcessing;