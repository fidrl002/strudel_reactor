
// contains panel 1 - text area with music to process
function TextProcessing({ value, onChange }) {
    return (
        <>
            <label htmlFor="proc" className="form-label">Text to preprocess:</label>
            <textarea className="form-control" rows="15" value={value} onChange={onChange} id="proc" ></textarea>
        </>
    );
}

export default TextProcessing;