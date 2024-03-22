import React, { useState, useEffect, useRef } from 'react';

export function ContextMenu({ children, contextContentSize={x : 300, y : 100}, contextContentOffset={x : 15, y : 5} }) 
{
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [headerChild, contentChild] = React.Children.toArray(children);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleContextMenu = (e) => {
        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const dropdownWidth = contextContentSize.x + contextContentOffset.x;
        const dropdownHeight = contextContentSize.y + contextContentOffset.y;
        const offsetX = -90; // Adjust the horizontal offset
        const offsetY = 10; // Adjust the vertical offset
        
        // Calculate adjusted position with offset
        const adjustedX = mouseX + dropdownWidth + offsetX > windowSize.width ? windowSize.width - dropdownWidth : mouseX + offsetX;
        const adjustedY = mouseY + dropdownHeight + offsetY > windowSize.height ? windowSize.height - dropdownHeight : mouseY + offsetY;
        
        setPosition({ x: adjustedX, y: adjustedY });
        setIsVisible(true);
    }

    const handleClickOutside = () => setIsVisible(false);

    return (
        <div className='w-full'>
            <div className='w-full' onContextMenu={handleContextMenu}>
              {headerChild}
            </div>
            <div style={{display : isVisible ? 'block' : 'none'}} className="fixed top-0 right-0 bottom-0 left-0 z-5" onContextMenu={handleClickOutside} onClick={handleClickOutside}></div>
            <div className="fixed z-10"
                style={{ top: `${position.y}px`, left: `${position.x}px`, display : isVisible ? 'block' : 'none' }}>
                {contentChild}
             </div>
        </div>
    )
}
