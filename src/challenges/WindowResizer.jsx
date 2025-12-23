import { useEffect, useState } from "react";


const WindowResizer = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, []);
    
    return (
        <div>
            <section>
                <h1>Window Details</h1>
                <p>Window Width: {windowWidth}</p>
                <p>Window Height: {windowHeight}</p>
            </section>
        </div>
    )
}

export default WindowResizer; 