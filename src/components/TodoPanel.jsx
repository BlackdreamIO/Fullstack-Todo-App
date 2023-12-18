import React from 'react';

import TodoColumnPanel from './Todo/TodoColumn/TodoColumnPanel';
import TodoListPanel from './Todo/TodoList/TodoListPanel';
import { TodoContextProvider } from '../contextAPI/TodoContex';

export default function TodoPanel() 
{  
    return (
        <div className='flex flex-row items-center justify-center'>
            <TodoContextProvider >
                <TodoColumnPanel/>
                <TodoListPanel/>
            </TodoContextProvider>
        </div>
    )
}

