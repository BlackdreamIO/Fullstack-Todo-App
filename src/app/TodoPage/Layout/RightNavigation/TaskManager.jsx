import React, { useState } from 'react'
import { useTaskManagerContext } from '@/contextAPI/TaskManagerContextAPI'

import { Container } from '@/components/container/container';
import TodoItem from './Todo/TodoItem'

import { Button } from '@/components/cva/button/cvaButton';
import CompleteSection from './TodoSections/CompleteSection';
import InCompleteSection from './TodoSections/IncompleteSection';

import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";


export default function TaskManager() 
{
    const taskManagerContext = useTaskManagerContext();

    const [todos, setTodos] = useState(Array(10).fill('randomXYZ'));

    const [minimizeIncomplete, setMinimizeIncomplete] = useState(false);
    const [minimizeComplete, setMinimizeComplete] = useState(false);

    return (
        <Container flow='col' itemsItem='start' justifyItem='start' wrap='no-wrap' className='p-2 space-y-5 w-full h-[75vh] overflow-y-scroll'>
    
            <InCompleteSection 
                todos={todos}
                onMinimize={() => setMinimizeIncomplete(!minimizeIncomplete)} 
                isMinimized={minimizeIncomplete}>
            </InCompleteSection>

            <CompleteSection onMinimize={() => setMinimizeComplete(!minimizeComplete)} isMinimized={minimizeComplete}>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            </CompleteSection>

            <ContextMenu CloseAfterEvent={true} contextContentSize={{x : 300, y : 110}} className='w-full'>
                <ContextMenuHeader className='w-full min-h-auto h-[250px]'></ContextMenuHeader>
                <ContextMenuContent className='w-[300px] space-y-2'>
                    <Button width='full' intent='secondary'>Refresh</Button>
                    <Button width='full'>Add Section</Button>
                </ContextMenuContent>
            </ContextMenu>

        </Container>
    )
}
