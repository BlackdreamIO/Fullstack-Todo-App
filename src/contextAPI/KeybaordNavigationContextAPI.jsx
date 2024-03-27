import React, { createContext, useContext, useState, useEffect } from 'react';
import { useKeyPress } from '@/hooks/useKeyPress';

const KeyboardNavigationContext = createContext(null);

export const useKeyboardNavigationContext = () => useContext(KeyboardNavigationContext);

export const KeyboardNavigationContextProvider = (props) => {
    
    const [keybaordTabTriggerd, setKeybaordTabTriggerd] = useState(0);
    const [stopTrigger, setStopTrigger] = useState(false);

    const [keybaordNavigationEnabled, setKeybaordNavigationEnabled] = useState(true);
    
    const [crateNewTodoItem, setCrateNewTodoItem] = useState('CTRL + N');
    const [crateNewTodoGroup, setCrateNewTodoGroup] = useState('CTRL + G');

    const handleModeDetection = () => {
        if(!stopTrigger) {
            setKeybaordTabTriggerd(prev => prev + 1);
        }
    }

    const handleEnableKeybaordNavigation = () => {
        setKeybaordNavigationEnabled(true);
        setStopTrigger(false);
    }

    useEffect(() => {
        if(keybaordTabTriggerd > 2 && !keybaordNavigationEnabled) {
            setStopTrigger(true);
        }
        //return () => clearTimeout(timeout);
    }, [keybaordTabTriggerd, stopTrigger, keybaordNavigationEnabled])
    

    useKeyPress('Tab', handleModeDetection);

    return (
        <KeyboardNavigationContext.Provider value={
            {   keybaordNavigationEnabled, setKeybaordNavigationEnabled,
                crateNewTodoItem, setCrateNewTodoItem,
                crateNewTodoGroup, setCrateNewTodoGroup ,
                stopTrigger, setStopTrigger,
                handleEnableKeybaordNavigation,
            }}>
            {props.children}
        </KeyboardNavigationContext.Provider>
    )
}