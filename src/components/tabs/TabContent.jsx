import React from 'react';

export const TabContent = ({ value, children, activeTab }) => {
    return <div style={{ display: value === activeTab ? 'block' : 'none' }}>{children}</div>;
}