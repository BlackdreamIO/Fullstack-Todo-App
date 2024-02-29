import { useState, useEffect, useRef, useCallback } from 'react';

export function useInsideClick(ref, defaultValue = false) {
    const [isInside, setIsInside] = useState(defaultValue);
    
    const handleClickOutside = useCallback((e) => {
        if (ref.current && ref.current.contains(e.target)) 
        {
            setIsInside(true);
        }
        else setIsInside(false);
    }, [ref]);

    useEffect(() => {
        const handleClick = (e) => handleClickOutside(e);
        
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('contextmenu', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('contextmenu', handleClick);
        }
    }, [handleClickOutside, ref, defaultValue]);

    return [isInside];
}
