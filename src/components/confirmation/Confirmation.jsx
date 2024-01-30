import React, { useEffect, useRef } from 'react'
import cn from '../../utils/utis';

import { ConfirmationFooter } from './ConfirmationFooter';

export default function Confirmation({children, overlayClassName, contentClassName, onConfirm, onClose, open=false, ...rest}) 
{
    const confirmationRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (confirmationRef.current && !confirmationRef.current.contains(event.target)) {
            if(onClose != null) {
                onClose();
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);

            return () => {
                window.removeEventListener('click', handleOutsideClick);
            };
        }, 1000)
    }, [open]);

    const handleConfirmClick = () => {
        if(onConfirm) {
            onConfirm();
        }
    }
    const handleCancellClick = () => {
        if(onClose) {
            onClose();
        }
    }
    
    const defaultStyle = `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] dark:bg-[--darkPrimary] p-2
        dark:bg-[rgb(0,0,0,0.5)] w-[100%] h-[100vh] flex flex-row items-center justify-center`;

    const defaultContentStyle = `dark:bg-[--darkPrimary] rounded-lg w-[500px] max-w-[600px] p-4 relative z-[3000]`;

    return (
        <div className={cn(defaultStyle, overlayClassName)} style={{display : open ? 'flex' : 'none'}} >
            <div ref={confirmationRef} className={cn(defaultContentStyle, contentClassName)} {...rest}>
                {
                    React.Children.map(children, (child) => {
                        return child.type === ConfirmationFooter ? 
                            React.cloneElement(child, { OnConfirm : handleConfirmClick, OnCancell : handleCancellClick }) 
                            : 
                            child
                    })
                }
            </div>
        </div>
    )
}
