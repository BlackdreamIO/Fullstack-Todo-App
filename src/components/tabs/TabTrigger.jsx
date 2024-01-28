import React, { useEffect } from 'react';
import { Button, buttonVarient } from '../button/button';

export const TabTrigger = ({ isActive, onClick, children, className, value, parentProps, ...rest }) => {

    const handleClick = () => onClick(value);

    return (
        <Button varient={buttonVarient.outlined} className={className} onClick={handleClick} {...rest}>
            {children}
        </Button>
    )
}
