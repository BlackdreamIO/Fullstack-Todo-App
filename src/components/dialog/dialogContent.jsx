import { useRef, useEffect } from "react";
import cn from "../../utils/utis";
import { useInsideClick } from "@/hooks/useInsideClick";
import { useOutsideClick } from "@/hooks/useOutsideClick";

//import { useInsideTarget } from "../../hooks/useInsideTarget";

export function DialogContent({children, overlayClassName, className, onClose, isOpen, ...rest}) 
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
        }, 700);
    }, [isOpen]);

    const defaultOverlayClassName = `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] 
        bg-[rgb(5,5,5,0.5)] w-full h-screen flex flex-col items-center justify-center`;

    const defaultClassName = `z-[2000] rounded-tenPixel`;

    return (
        <div className={cn(defaultOverlayClassName, overlayClassName)} {...rest}>
            <div className={cn(defaultClassName, className)} ref={dialogRef}>
                {children}
            </div>
        </div>
    )
}