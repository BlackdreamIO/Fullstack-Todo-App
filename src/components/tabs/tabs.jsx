import React, { useState } from 'react';
import { TabTriggerList } from './TabTriggerList';
import { TabContentList } from './TabContentList';

export const Tabs = ({ children, defaultTab='', ...rest }) => {
    
    const [currentSelectedTab, setCurrentSelectedTab] = useState(defaultTab || '');

    const handleTabSelection = (tab) => {
        setCurrentSelectedTab(tab)
    }

    return (
        <div>
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

