import React from 'react';
import TodoColumnPanel from './LeftNavigation/TodoColumnPanel';

export default function TodoLayout() 
{
    return (
        <div className='border-t-[1px] border-neutral-500 '>
            <TodoColumnPanel/>
        </div>
    )
}
