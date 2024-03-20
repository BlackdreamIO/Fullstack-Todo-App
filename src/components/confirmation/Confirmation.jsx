import React from 'react'
import cn from '../../utils/utis';

import { ConfirmationFooter } from './ConfirmationFooter';
import { useKeyPress } from '@/hooks/useKeyPress';

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

    useKeyPress('Escape', handleCancellClick);
    
    const defaultStyle = `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-2 w-[100%] h-[100vh] flex flex-row items-center justify-center`;

    const defaultContentStyle = `bg-theme-bgAbsolute border-[1px] border-neutral-800 rounded-lg w-[500px] max-w-[600px] p-4 relative z-[3000]`;

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
