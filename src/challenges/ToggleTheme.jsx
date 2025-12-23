import { useState } from "react"


const theme = {
    "dark" : {
        textColor : 'White',
        backgroundColor: 'black',
        label : 'light'
    },
    "light" : {
        backgroundColor : 'White',
        textColor: 'black',
        label: 'dark'
    }
}

const ToggleTheme = () => {
    const [currentThemeName, setCurrentThemeName] = useState("dark");
    const currentTheme = theme[currentThemeName];

    return (
        <div style={{backgroundColor : currentTheme.backgroundColor}}>
            <section>
                <button style={{backgroundColor : currentTheme.backgroundColor, color: currentTheme.textColor}}
                onClick={() => setCurrentThemeName((prev) => prev === "dark" ? "light" : "dark")}>{currentTheme.label}</button>
            </section>
            <section>
                <p style={{color: currentTheme.textColor}}>Toggle Theme Challenge</p>
            </section>
        </div>
    )
}

export default ToggleTheme;