import { useEffect } from 'react';

export function useOutsideClick(ref, callback) {
    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    }

    useEffect(() => {
        const handleClick = (e) => handleClickOutside(e);
        
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleClick);
        }
    }, [ref, callback])
}
