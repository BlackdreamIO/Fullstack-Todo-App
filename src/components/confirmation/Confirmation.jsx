import React from 'react'
import cn from '../../utils/utis';

import { ConfirmationFooter } from './ConfirmationFooter';

export function Confirmation({children, overlayClassName, contentClassName, onConfirm, onClose, open=false, ...rest}) 
{
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

    const defaultContentStyle = `dark:bg-black border-[1px] border-neutral-700 rounded-lg w-[500px] max-w-[600px] p-4 relative z-[3000]`;

    return (
        <div className={cn(defaultStyle, overlayClassName)} style={{display : open ? 'flex' : 'none'}} >
            <div className={cn(defaultContentStyle, contentClassName)} {...rest}>
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
