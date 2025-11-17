import { useEffect, useState } from "react";

// toggle dark mode with a bootstrap switch
// implements document-wide dark grey background and white text (css)
function DarkModeSwitch() {

    const [darkMode, setDarkMode] = useState(false);

    const changeColour = () => {
        if (darkMode === false) {
            setDarkMode(true);
        }
        else {
            setDarkMode(false);
        }
    }

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);


    return (
        <div className="form-check form-switch fs-4 mb-3">
            <label className="form-check-label" htmlFor="darkmode-switch">Dark Mode</label>
            <input className="form-check-input" type="checkbox" id="darkmode-switch" defaultChecked={darkMode} onClick={changeColour} />
        </div>
    );
}

export default DarkModeSwitch;
