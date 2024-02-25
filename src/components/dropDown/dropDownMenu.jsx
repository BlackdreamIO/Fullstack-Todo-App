import { useRef } from 'react';
import cn from '../../utils/utis';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useKeyPress } from 'react-use';

export const DropDownMenu = ({ children, onClose, className, isOpen=false, ...rest }) => {
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => {
        if(onClose != null) {
            onClose();
        }
    });

    useKeyPress('Escape', () => onClose());

    return (
        <div className={cn('relative inline-block', className)} ref={dropdownRef} {...rest}>
            {children}
        </div>
    )
}
