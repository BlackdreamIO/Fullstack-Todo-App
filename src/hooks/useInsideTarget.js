import { useState, useEffect } from "react";

export function useInsideTarget({ref}) 
{
    const [inTarget, setInTarget] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (cevent) => {
            if(cevent.current && !ref.current.contains(cevent.target)) {
                setInTarget(false);
            }
            setInTarget(true);
        }
       
        window.addEventListener('click', handleOutsideClick);
        
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        }
    }, [])

    return [inTarget, setInTarget];
}
