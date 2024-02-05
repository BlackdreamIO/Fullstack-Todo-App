import React from 'react';
import TodoNavbar from './Navbar/TodoNavbar';
import TodoLayout from './Layout/TodoLayout';

import { Button }from '../../components/cva/button/cvaButton'
import { Container } from '../../components/container/container';
import BottomNavigationStatus from './Layout/BottomNavigation/BottomNavigationStatus';

export default function TodoPage() 
{
    return (
        <div className='h-screen dark:bg-black'>
            <TodoNavbar/>
            <TodoLayout/>
            <BottomNavigationStatus/>
        </div>
    )
}
