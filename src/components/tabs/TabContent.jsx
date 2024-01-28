import React from 'react';

export const TabContent = ({ children, value, activeTab, className, ...rest }) => {

    const isActive = activeTab === value;

    return (
        <div className={isActive ?className : 'dark:text-[aquamarine]'} {...rest}>
            {children}
        </div>
    )
}