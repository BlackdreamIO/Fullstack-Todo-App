// Tabs.js
import React, { useState } from 'react';
import { TabTriggerList } from './TabTriggerList';
import { TabContentList } from './TabContentList';

export const Tabs = ({ children, ...rest }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.value);

    const handleTabClick = (value) => {
        setActiveTab(value);
    }

    const renderTabs = () => {
        let tabList = null;
        let contentList = null;

        React.Children.forEach(children, (child) => {
            if (child.type === TabTriggerList) {
                tabList = React.cloneElement(child, {
                    onClick: handleTabClick,
                    activeTab: activeTab,
                })
            }

            if (child.type=== TabContentList) 
            {
                contentList = React.cloneElement(child, {
                    activeTab: activeTab,
                })
            }
            return (
                <div>
                    {tabList}
                    {contentList}
                </div>
            )
        })
    }

    return renderTabs();
}

