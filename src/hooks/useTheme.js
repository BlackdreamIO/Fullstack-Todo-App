import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

export function useThemeManager() 
{
    const [themeCookies, setThemeCookie, removeThemeCookie] = useCookies(['themeCookie']);
    const [isDarkMode, setIsDarkMode] = useState(themeCookies.themeCookie);

    useEffect(() => {
        const changeTheme = () => {
            document.documentElement.classList.remove(isDarkMode ? 'light' : 'dark');
            document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
            setThemeCookie("themeCookie", isDarkMode);
        }
        changeTheme();

    }, [isDarkMode])

    return [ isDarkMode, setIsDarkMode ];
}