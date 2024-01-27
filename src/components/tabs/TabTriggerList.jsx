import React from "react";

import cn from "../../utils/utis"
import { TabContent } from './TabContent';

export const TabTriggerList = ({children, className, activeTab, ...rest}) => {
    return React.Children.map(children, (child) => {
        if (child.type.name === TabContent) 
        {
            return React.cloneElement(child, {
                activeTab: activeTab,
            })
        }
    })
}