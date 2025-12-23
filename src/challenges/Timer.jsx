import { useEffect, useState, useRef } from "react";

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div>
            <section>
                <p>{time}</p>
            </section>
            <section>
                <button onClick={handleStart} disabled={isRunning}>Start</button>
                <button onClick={handlePause} disabled={!isRunning}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </section>
        </div>
    );
};

export default Timer;