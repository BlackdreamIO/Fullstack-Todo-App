import { useState, useEffect, useRef } from 'react';


export const DropDownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);
    

    return (
        <div className='relative inline-block' ref={dropdownRef}>
            <div onClick={toggleMenu}>
                {children}
            </div>
            {
                isOpen && 
                (
                    <div className='dark:bg-white w-[150px] h-[200px] absolute right-0 dark:text-black m-2'>
                        <p>This is the dropdown content</p>
                    </div>
                )
            }
        </div>
    )
}