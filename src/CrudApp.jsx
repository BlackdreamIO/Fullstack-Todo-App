import React from 'react';
import TodoPanel from './components/TodoPanel';
import Navbar from './components/Navbar';
import AuthPanel from './components/AuthPanel';

export default function CrudApp() 
{
    return (
        <div className='flex flex-row items-center justify-center'>
            <Navbar/>
            <AuthPanel/>
        </div>
    )
}
