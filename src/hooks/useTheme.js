import { useState, useEffect } from "react";

export function useThemeManager() 
{
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const changeTheme = () => {
            document.documentElement.classList.remove(isDarkMode ? 'light' : 'dark');
            document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
            localStorage.setItem('selectedTheme', isDarkMode);
        }
        changeTheme();

    }, [isDarkMode])

    return [ isDarkMode, setIsDarkMode ];
}