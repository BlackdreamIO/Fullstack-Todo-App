import React, { useState, useEffect, useRef } from 'react'
import TodoItem from './Todo/TodoItem'

import { useTaskManagerContext } from '@/contextAPI/TaskManagerContextAPI'
import { Typography } from '@/components/typography/typohgraphy';
import { Divider } from '@/components/divider';
import { Container } from '@/components/container/container';
import { MorphicElement } from '@/components/morphicElement';
import { Wrapper } from '@/components/wrapper/wrapper';

import { Button } from '@/components/cva/button/cvaButton';
import CompleteSection from './TodoSections/CompleteSection';
import InCompleteSection from './TodoSections/IncompleteSection';

import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

export default function TaskManager() 
{
    const taskManagerContext = useTaskManagerContext();
    const containerRef = useRef(null);

    const [minimizeIncomplete, setMinimizeIncomplete] = useState(false);
    const [minimizeComplete, setMinimizeComplete] = useState(false);

    return (
        <Container flow='col' itemsItem='start' justifyItem='start' wrap='no-wrap' className='p-2 space-y-5 w-full h-[75vh] overflow-y-scroll select-none'>
    
            <InCompleteSection onMinimize={() => setMinimizeIncomplete(!minimizeIncomplete)} isMinimized={minimizeIncomplete}>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
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
