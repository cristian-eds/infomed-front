import { useCallback, useState } from "react"

const useToggle = () => {

    const [state, setState] = useState(false);

    const toggle = useCallback(() => {
        setState(prevState => !prevState);
    },[])

    return {state, toggle}
}

export default useToggle;