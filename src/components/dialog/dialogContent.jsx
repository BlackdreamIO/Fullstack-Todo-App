import { useRef, useEffect } from "react";
import cn from "../../utils/utis";

export default function DialogContent({children, className, onClose, isOpen}) 
{
    const dialogRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            if(onClose != null) {
                onClose();
            }
        }
    };

    useEffect(() => {
        // using 1 sec of delay will fix the conflict issue

        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);

            return () => {
                window.removeEventListener('click', handleOutsideClick);
            };
        }, 1000);
    }, [isOpen]);

    const defaultClassName = `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] 
            dark:bg-[rgb(5,5,5,0.1)] w-full h-screen backdrop-blur-[5px] flex flex-col items-center justify-center`

    return (
        <div className={cn(defaultClassName, className)}>
            <div ref={dialogRef} >
                {children}
            </div>
        </div>
    )
}