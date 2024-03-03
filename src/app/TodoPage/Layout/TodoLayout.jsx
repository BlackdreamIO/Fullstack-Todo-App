import React from 'react';
import TaskGroupPanel from './LeftNavigation/TaskGroupPanel';

export default function TodoLayout() 
{
    return (
        <div className='border-t-[1px] dark:border-neutral-600 '>
            <TaskGroupPanel/>
        </div>
    )
}
