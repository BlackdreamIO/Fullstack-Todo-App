import { useState, useEffect, useRef } from 'react';

export const DropDownMenu = ({ children, onClose, isOpen=false }) => {
    const dropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            if(onClose != null) {
                onClose();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);
    

    return (
        <div className='relative inline-block' ref={dropdownRef}>
            {children}
        </div>
    )
}
