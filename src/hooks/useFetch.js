import { useEffect, useState } from 'react'
import axios from 'axios';

export function useFetch(url='', enabled=true, ...options)
{
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let isMounted = true;

    const UseAxios = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        try
        {
            setIsLoading(true);
            const res = await axios.get(url, {...options, signal});
            console.log('Fetching Data From Server[...[], ...[]]...');
            if (isMounted) {
                setResponse(res.data);
            }
            setIsLoading(false);
        } 
        catch (error) 
        {
            if (error.name === 'AbortError') {
                console.log('Request aborted');
            } 
            else if(isMounted) setError(error);
            setIsLoading(false);
        }
        finally 
        {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (enabled) {
            UseAxios();
        } 
        return () => isMounted = false; // Cleanup function to set isMounted to false when component unmounts
    }, []);

  return { response, error, isLoading };
}