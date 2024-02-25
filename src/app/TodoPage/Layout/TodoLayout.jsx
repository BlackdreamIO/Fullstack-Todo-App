import React from 'react';
import TodoColumnPanel from './LeftNavigation/TodoColumnPanel';

export default function TodoLayout() 
{
    return (
        <div className='border-t-[1px] dark:border-neutral-600 '>
            <TodoColumnPanel/>
        </div>
    )
}
