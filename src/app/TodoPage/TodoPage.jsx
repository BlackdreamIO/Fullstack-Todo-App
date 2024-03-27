import TodoNavbar from './Layout/TopNavigation/TodoNavbar';
import TodoLayout from './Layout/TodoLayout';
import BottomNavigationStatus from './Layout/BottomNavigation/BottomNavigationStatus';
import KeybaordNavigationInfo from './OverlaysPopUp/KeybaordNavigationInfo';
import { KeyboardNavigationContextProvider } from '@/contextAPI/KeybaordNavigationContextAPI';

export default function TodoPage() 
{
    return (
        <div className='h-screen dark:bg-black cursor-default select-none'>
            <KeyboardNavigationContextProvider>
                <TodoNavbar/>
                <TodoLayout/>
                <BottomNavigationStatus/>
                <KeybaordNavigationInfo/>
            </KeyboardNavigationContextProvider>
        </div>
    )
}
