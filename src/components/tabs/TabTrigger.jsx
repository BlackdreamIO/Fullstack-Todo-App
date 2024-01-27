import React from 'react';
import { Button } from '../button/button';

export const TabTrigger = ({ value, isActive, onClick, children }) => {
    return (
        <Button onClick={onClick}>
            {children}
        </Button>
    )
}
