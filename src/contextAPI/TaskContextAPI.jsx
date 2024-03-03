import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext(null);

export const useTaskContext = () => useContext(TaskContext);

export const TaskContextProvider = (props) => {
    const [selectedTaskGroup, setSelectedTaskGroup] = useState('');

    return (
        <TaskContext.Provider value={{ selectedTaskGroup, setSelectedTaskGroup }}>
            {props.children}
        </TaskContext.Provider>
    )
}