import React from 'react'
import TodoItem from './Todo/TodoItem'

import { useTaskManagerContext } from '@/contextAPI/TaskManagerContextAPI'
import { Typography } from '@/components/typography/typohgraphy';
import { Divider } from '@/components/divider';
import { Container } from '@/components/container/container';
import { MorphicElement } from '@/components/morphicElement';

export default function TaskManager() 
{
    const taskManagerContext = useTaskManagerContext();

    return (
        <Container flow='col' itemsItem='start' justifyItem='start' wrap='no-wrap' className='p-2 space-y-5 w-full h-[77vh] overflow-y-scroll'>
            <MorphicElement className='flex flex-row flex-wrap items-center justify-start gap-2 w-full'>
                <Typography variant={'h2'}>Incomplete</Typography>
                <Divider className='bg-theme-borderPrimary'/>

                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            </MorphicElement>
            <MorphicElement className='flex flex-row flex-wrap items-center justify-start gap-2 w-full'>
                <Typography variant={'h2'}>Complete</Typography>
                <Divider className='bg-theme-borderPrimary'/>

                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            </MorphicElement>
        </Container>
    )
}
