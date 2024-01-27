import React from 'react';
import TodoColumnPanel from './LeftNavigation/TodoColumnPanel';

export default function TodoLayout() 
{
    return (
        <div className='dark:bg-[--darkFour] border-t-[1px] border-black '>
            <TodoColumnPanel/>
        </div>
    )
}
