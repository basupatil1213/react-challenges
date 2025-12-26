import { useState } from "react"

export const useToggle = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const setToggle = () => setValue(prev => !prev);

    return [value, setToggle];
}