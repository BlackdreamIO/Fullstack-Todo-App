import { useEffect } from 'react';

export function useOutsideClick(ref, callback) {
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
    }

    useEffect(() => {
        const handleClick = (event) => handleClickOutside(event);
        
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            document.addEventListener('contextmenu', handleClick);
        }
    }, [ref, callback])
}
