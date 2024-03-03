import { useEffect, useRef } from 'react';

export const useContextMenuPosition = () => {
    const elementRef = useRef(null);

    const handleContextMenu = (e) => {
        e.preventDefault(); // Prevent the default context menu from appearing
        const element = elementRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const elementWidth = rect.width;
        const elementHeight = rect.height;

        let left = mouseX - elementWidth / 2;
        let top = mouseY - elementHeight / 2;

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
        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    return elementRef;
}
