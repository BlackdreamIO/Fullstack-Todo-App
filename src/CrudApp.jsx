import React from 'react';
import Navbar from './components/Navbar';
import TodoPanel from './components/TodoPanel';

export default function CrudApp() 
{
    return (
        <div className='w-full'>
            <Navbar />
            <TodoPanel />
        </div>
    )
}
