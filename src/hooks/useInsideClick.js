import { useEffect, useState, useCallback } from 'react';

export function useInsideClick(ref) 
{
    const [useInTarget, setUseInTarget] = useState(false);
    
    const handleClickOutside = useCallback((e) => {
        if (ref.current && ref.current.contains(e.target)) 
        {
            setUseInTarget(true);
        }
        else setUseInTarget(false);
    })

    useEffect(() => {
        const handleClick = (e) => handleClickOutside(e);
        
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleClick);
        }
    }, [ref])

    return [useInTarget];
}
