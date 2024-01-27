// Tabs.js
import React, { useState } from 'react';
import TabTrigger from './TabTrigger';
import TabContent from './TabContent';

export const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.value);

    const handleTabClick = (value) => {
        setActiveTab(value);
    }

    const renderTabs = () => {
        return React.Children.map(children, (child) => {
            if (child.type === TabTrigger) {
                return React.cloneElement(child, {
                  isActive: child.props.value === activeTab,
                  onClick: () => handleTabClick(child.props.value),
                })
            }
        })
    }

    const renderContent = () => {
        return React.Children.map(children, (child) => {
            if (child.type === TabContent && child.props.value === activeTab) {
                return child.props.children;
            }
        })
    }

    return (
        <div>
            <div>{renderTabs()}</div>
            <div>{renderContent()}</div>
        </div>
    )
}

