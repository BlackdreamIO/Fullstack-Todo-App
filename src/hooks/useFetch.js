import { useState, useEffect } from 'react';

export function useFetch(url='', method='GET', data = null, enable=true) 
{
    
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try 
            {
                const options = {
                    method: method.toUpperCase(),
                    headers: { 'Content-Type': 'application/json', },
                    body: data ? JSON.stringify(data) : null,
                }
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setIsLoading(false);
            } 
            catch (error) 
            {
                setError(error);
                setIsLoading(false);
            }
        }

        enable ? fetchData() : setIsLoading(false);

        return () => setIsLoading(false);
    }, [url, method, data, enable]);

    return { response, error, isLoading };
}
