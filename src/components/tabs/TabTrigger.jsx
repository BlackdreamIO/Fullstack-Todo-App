import React from 'react';

export const TabTrigger = ({ value, isActive, onClick, children }) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}
