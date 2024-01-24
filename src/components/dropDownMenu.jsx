import { useState, useEffect, useRef } from 'react';


export const DropDownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
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
            <div onClick={toggleMenu}>
                {children[0]}
            </div>
            {
                isOpen && children[1] && (
                //    <DropDownContent>{children[1]}</DropDownContent>
                    <DropDownContentManager render={isOpen} />
                )
            }
        </div>
    )
}

export const DropDownHeader = ({ children }) => {
    return <>{children}</>;
};

export const DropDownContent = ({children, onChildrenChange}) => {
    onChildrenChange(children);

    return (
        <div className='dark:bg-neutral-950 w-[150px] h-[200px] absolute right-0 dark:text-black m-2
        rounded-[5px] z-20 shadow-[5px_5px_20px_5px_rgb(0,0,0,1)] dark:border-neutral-700 border-black 
        border-[1px]'>
            {children}
        </div>
    )
}

const DropDownContentManager = ({render=false}) => {
    const [contentFromDropDown, setContentFromDropDown] = useState(null);

    const handleChildrenChange = (children) => {
        setContentFromDropDown(children);
    };

    useEffect(() => {
        DropDownContent({
            onChildrenChange : handleChildrenChange()
        })
    }, [])
    

    return (
        render && (
            <div>
                {contentFromDropDown}
            </div>
        )
    )
}