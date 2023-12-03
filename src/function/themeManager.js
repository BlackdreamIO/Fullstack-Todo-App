
export function CheckIfDarkMode()
{
    const isDarkMode = document.documentElement.className === 'dark' ? true : false;
    return isDarkMode;
}

export default function SwitchThemeFunction(useDarkMode)
{
    if (useDarkMode)
    {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark');
        CheckIfDarkMode();
    } 
    else 
    {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light');
        CheckIfDarkMode();
    }
}