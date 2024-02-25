import { useEffect, useState } from 'react';

export function useInsideClick(ref) 
{
    const [useInTarget, setUseInTarget] = useState(false);
    
    const handleClickOutside = (e) => {
        if (ref.current && ref.current.contains(e.target)) 
        {
            setUseInTarget(true);
        }
        setUseInTarget(false);
    }

    useEffect(() => {
        const handleClick = (e) => handleClickOutside(e);
        
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleClick);
        }
    }, [ref])

    return [useInTarget, setUseInTarget];
}
