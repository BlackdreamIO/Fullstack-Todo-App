import { forwardRef, useRef } from 'react';
import cn from '../../utils/utis';
import { useOutsideClick, useKeyPress } from '@/hooks/hooksExporter';

export const DropDownMenu = forwardRef(({ children, onClose, className, isOpen=false, ...rest }, ref) => {
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => {
        if(onClose != null) {
            onClose();
        }
    })

    useKeyPress('Escape', () => {
        if(onClose != null) {
            onClose();
        }
    });

    return (
        <div className={cn('relative inline-block', className)} ref={dropdownRef} {...rest}>
            {children}
        </div>
    )
})
