import React from 'react';

export const TabContent = ({ children, value, activeTab, className, ...rest }) => {

    const isActive = activeTab === value;

    return (
        <div className={isActive ? className : 'hidden'} {...rest}>
            {children}
        </div>
    )
}