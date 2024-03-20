import React from 'react'
import TodoItem from './Todo/TodoItem'

import { useTaskManagerContext } from '@/contextAPI/TaskManagerContextAPI'

export default function TaskManager() 
{
    const taskManagerContext = useTaskManagerContext();

    return (
        <div className='flex flex-row flex-wrap items-start justify-start p-2 gap-2'>
            <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
        </div>
    )
}
