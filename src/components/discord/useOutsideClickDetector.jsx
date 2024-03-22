import React, { useState, useEffect, useRef } from 'react';

export const useOutsideClickDetector = (ref) => {
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOutsideClick(true);
    } else {
      setIsOutsideClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]); // Re-attach event listener on ref change

  return { isOutsideClick };
};
