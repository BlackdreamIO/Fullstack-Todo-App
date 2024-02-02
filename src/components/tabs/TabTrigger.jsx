import React, { useEffect } from 'react';
import { Button } from '../cva/button/cvaButton';

export const TabTrigger = ({ isActive, onClick, children, className, value, parentProps, ...rest }) => {

    const handleClick = () => onClick(value);

    return (
        <Button intent='ghost' className={className} onClick={handleClick} {...rest}>
            {children}
        </Button>
    )
}
