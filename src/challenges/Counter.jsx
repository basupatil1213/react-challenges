import { useState } from "react";


const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <section>
                <label htmlFor="counter">Current Count</label>
                <p id="counter">{count}</p>
            </section>
            <section>
                <button disabled ={count <= 0} onClick={() => setCount(prev => prev - 1)}>Decrement</button>
                <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
            </section>
        </>
    )
}

export default Counter;