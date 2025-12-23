import { useState } from "react";


const ControlledInput = () => {
    const [text, setText] = useState('');
    return (
        <div>
            <section>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <p>{text}</p>
            </section>
            <section>
                <button disabled={text === ''} onClick={() => setText('')}>clear</button>
            </section>
        </div>
    )
}

export default ControlledInput;