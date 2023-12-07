import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export const TodoContextProvider = ({ children }) => {
    const [isDeleteCalled, setIsDeleteCalled] = useState(false);

    const contextDeleteCall = () => setIsDeleteCalled(prevState => !prevState);

    return (
        <TodoContext.Provider value={{ isDeleteCalled, contextDeleteCall,  }}>
            {children}
        </TodoContext.Provider>
    );
};