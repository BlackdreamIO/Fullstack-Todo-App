import React from 'react';
import { TabContent } from './TabContent';

export const TabContentList = ({children, active}) => {

    return (
        <div >
            {
                React.Children.map(children, (child) => {
                    if (child.type === TabContent) {
                        return React.cloneElement(child, { activeTab: active });
                    }
                    return child;
                })
            }
        </div>
    )
}