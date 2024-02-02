import React, { useState } from 'react';
import cn from '../../utils/utis';

export const Tabs = ({ children, defaultTab='', className, ...rest }) => {
    
    const [currentSelectedTab, setCurrentSelectedTab] = useState(defaultTab || '');

    const handleTabSelection = (tab) => {
        setCurrentSelectedTab(tab)
    }

    return (
        <div className={cn('w-[95%] min-h-[550px] overflow-y-scroll m-auto dark:bg-neutral-950 rounded-lg p-2', className)} { ...rest}>
            {
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) 
                    {
                        return React.cloneElement(child, { onTabSelected: handleTabSelection, active: currentSelectedTab });
                    }
                    return child;
                })
            }
        </div>
    )
}

