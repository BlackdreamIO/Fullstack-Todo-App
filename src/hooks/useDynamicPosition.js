import { useEffect, useRef } from 'react';

export const useDynamicPosition = (value) => {
    const elementRef = useRef(null);

    const handlePositioning = () => {
        const element = elementRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementWidth = rect.width;
        const elementHeight = rect.height;

        let left = window.innerWidth / 2 - elementWidth / 2;
        let top = window.innerHeight / 2 - elementHeight / 2;

        // Check if the element is outside the viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < 0) left = 0;
        if (left + elementWidth > viewportWidth) left = viewportWidth - elementWidth;

        if (top < 0) top = 0;
        if (top + elementHeight > viewportHeight) top = viewportHeight - elementHeight;

        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    };

    useEffect(() => {
        handlePositioning();
    }, [value]);

    return elementRef;
};
