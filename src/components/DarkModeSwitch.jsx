import { useEffect, useState } from "react";


function DarkModeSwitch() {

    // for dark mode, default white bg
    const [darkMode, setDarkMode] = useState(false);

    const changeColour = () => {
        if (darkMode === false) {
            setDarkMode(true);
        }
        else {
            setDarkMode(false);
        }
    }

    // useEffect - implement switching here, css?
    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);


    return (
        <div className="form-check form-switch fs-3 mb-4 mt-4">
            <label className="form-check-label" htmlFor="darkmode-switch">Dark Mode</label>
            <input className="form-check-input" type="checkbox" id="darkmode-switch" defaultChecked={darkMode} onClick={changeColour} />
        </div>

    );
}

export default DarkModeSwitch;
