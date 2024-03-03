import React from 'react';
import TodoNavbar from './Navbar/TodoNavbar';
import TodoLayout from './Layout/TodoLayout';

import BottomNavigationStatus from './Layout/BottomNavigation/BottomNavigationStatus';
import ElementWithMousePosition from './testComponent';

export default function TodoPage() 
{
    return (
        <div className='h-screen dark:bg-black'>
            <TodoNavbar/>
            <TodoLayout/>
            <BottomNavigationStatus/>
            {/* <ElementWithMousePosition /> */}
        </div>
    )
}
