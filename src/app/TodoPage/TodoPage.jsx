import React from 'react';
import TodoNavbar from './Navbar/TodoNavbar';
import TodoLayout from './Layout/TodoLayout';

export default function TodoPage() 
{
    return (
        <div className='h-screen dark:bg-black'>
            <TodoNavbar/>
            <TodoLayout/>
        </div>
    )
}
