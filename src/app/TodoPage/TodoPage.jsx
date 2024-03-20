import TodoNavbar from './Layout/TopNavigation/TodoNavbar';
import TodoLayout from './Layout/TodoLayout';
import BottomNavigationStatus from './Layout/BottomNavigation/BottomNavigationStatus';

export default function TodoPage() 
{
    return (
        <div className='h-screen dark:bg-black cursor-default '>
            <TodoNavbar/>
            <TodoLayout/>
            <BottomNavigationStatus/>
        </div>
    )
}
