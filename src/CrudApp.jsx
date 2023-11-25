import React from 'react';
import AuthPanel from './components/AuthPanel';
import TodoPanel from './components/TodoPanel';

export default function CrudApp() 
{
    return (
        <div className='flex flex-row items-center justify-center'>
            <AuthPanel/>
        </div>
    )
}
