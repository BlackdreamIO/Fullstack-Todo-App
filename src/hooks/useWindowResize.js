import { useEffect } from 'react';

export function useWindowResize ({thresholdWidth, onTriggerEnter, onTriggerOut})
{
    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            windowWidth <= thresholdWidth ? onTriggerEnter() : onTriggerOut();
        }

        handleResize();
        
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    
    }, [thresholdWidth, onTriggerEnter, onTriggerOut]);
}
