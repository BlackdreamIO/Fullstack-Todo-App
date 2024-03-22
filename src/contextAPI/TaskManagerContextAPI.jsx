import React, { createContext, useContext, useState } from 'react';

const TaskManagerContext = createContext(null);

export const useTaskManagerContext = () => useContext(TaskManagerContext);

export const TaskManagerContextProvider = (props) => {
    const [layoutMode, setLayoutMode] = useState('list');

    return (
        <TaskManagerContext.Provider value={{ layoutMode, setLayoutMode }}>
            {props.children}
        </TaskManagerContext.Provider>
    )
}