import { useState, useEffect } from "react";
import { auth } from "../database/firebase";

export function useCurrentAuthState() 
{
    const [authState, setAuthState] = useState('LoggedOut');

    useEffect(() => {
        const checkUser = () => {
            const userFound = auth.currentUser ? true : false;
            setAuthState(userFound ? 'LoggedIn' : 'LoggedOut');
        };

        // Call the function initially
        checkUser();

        // Subscribe to auth state changes
        const unsubscribe = auth.onAuthStateChanged(checkUser);

        // Clean up the subscription on component unmount
        return () => unsubscribe();
    }, []);

    return [authState, setAuthState];
}
