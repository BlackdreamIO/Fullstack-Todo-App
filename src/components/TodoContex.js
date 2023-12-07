import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export const AppProvider = ({ children }) => {
    const [isTriggered, setIsTriggered] = useState(false);

    const toggleTrigger = () => {
        setIsTriggered(prevState => !prevState);
    };

    return (
        <TodoContext.Provider value={{ isTriggered, toggleTrigger }}>
            {children}
        </TodoContext.Provider>
    );
};