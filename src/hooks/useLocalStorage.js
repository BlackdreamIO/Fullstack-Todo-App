import { useState, useEffect } from 'react';

/** 
 * Get Item by key
 * Set Item by key with data (setItems)
 * Remove Item by key
 * Method Selection <Get> <Set> <Remove>
 * Ouput (data) (hasValue) (keyExist)
**/

export function useLocalStorage(key='', method='GET', setItems) 
{
    const [localStorageData, setLocalStorageData] = useState(null);
    const [keyExist, setKeyExist] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        if(method.toLowerCase() === 'set') 
        {
            localStorage.setItem(key, JSON.stringify(setItems));
        }
        if(method.toLowerCase() === 'remove') 
        {
            if(localStorage.key(key) !== null) {
                localStorage.removeItem(key);
            }
        }
        else 
        {
            const storedData = localStorage.getItem(key);
            if (storedData !== null) 
            {
                const parsedData = JSON.parse(storedData);
                setLocalStorageData(parsedData);
                setHasValue(true);
                setKeyExist(true);
            } 
            else 
            {
                setHasValue(false);
                setKeyExist(false);
                setLocalStorageData(null);
            }
        }

    }, [key, method, setItems])

    return { localStorageData, hasValue, keyExist }
}