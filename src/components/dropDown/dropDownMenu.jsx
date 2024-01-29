import { useState, useEffect, useRef } from 'react';
import cn from '../../utils/utis';

export const DropDownMenu = ({ children, onClose, className, isOpen=false, ...rest }) => {
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
        <div className={cn('relative inline-block', className)} ref={dropdownRef} {...rest}>
            {children}
        </div>
    )
}
