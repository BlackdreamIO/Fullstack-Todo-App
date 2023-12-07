
export default function SwitchThemeFunction(useDarkMode)
{
    if (useDarkMode)
    {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark');
    } 
    else 
    {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light');
    }
}