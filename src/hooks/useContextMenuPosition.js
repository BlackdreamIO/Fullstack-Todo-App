import { useEffect, useRef } from 'react';


export const useContextMenuPosition = ({allowX=true, allowY=true, offsetX=0, offsetY=0}) => {
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

        left = Math.max(0, Math.min(left, viewportWidth - elementWidth));
        top = Math.max(0, Math.min(top, viewportHeight - elementHeight));

        if(allowX) {
            element.style.left = `${left + offsetX}px`;
        }
        if(allowY) {
            element.style.top = `${top + offsetY}px`;
        }
    };

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    return elementRef;
}
