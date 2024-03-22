import React, { useState, useEffect } from 'react';

const DiscordDropdown = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const dropdownWidth = 400; // Adjust as needed
    const dropdownHeight = 100; // Adjust as needed
    const offsetX = -90; // Adjust the horizontal offset
    const offsetY = 10; // Adjust the vertical offset

    // Calculate adjusted position with offset
    const adjustedX = mouseX + dropdownWidth + offsetX > windowSize.width ? windowSize.width - dropdownWidth : mouseX + offsetX;
    const adjustedY = mouseY + dropdownHeight + offsetY > windowSize.height ? windowSize.height - dropdownHeight : mouseY + offsetY;

    setPosition({ x: adjustedX, y: adjustedY });
    setIsVisible(true);
  };

  const handleClickOutside = () => {
    setIsVisible(false);
  };

  return (
    <div className='w-full'>
      <div className='w-full bg-theme-bgTertiary' onContextMenu={handleContextMenu}>Right-click here</div>
      {isVisible && (
        <>
          <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-5" onContextMenu={handleClickOutside} onClick={handleClickOutside}></div>
          <div className="fixed bg-theme-bgSecondary border-gray-300 p-2 z-10"
            style={{ top: `${position.y}px`, left: `${position.x}px` }}>
            <ul className='w-[400px] border-2 border-white'>
              <li>ContextContentAPI MANAGER</li>
              <li>ContextContentAPI MANAGER</li>
              <li>ContextContentAPI MANAGER</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DiscordDropdown;
