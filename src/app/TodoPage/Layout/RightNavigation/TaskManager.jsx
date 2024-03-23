import React, { useState, useEffect, useRef } from 'react'
import TodoItem from './Todo/TodoItem'

import { useTaskManagerContext } from '@/contextAPI/TaskManagerContextAPI'
import { Typography } from '@/components/typography/typohgraphy';
import { Divider } from '@/components/divider';
import { Container } from '@/components/container/container';
import { MorphicElement } from '@/components/morphicElement';
import { Wrapper } from '@/components/wrapper/wrapper';

import { IoMdArrowDropdown } from "react-icons/io";
import { BsMouse } from "react-icons/bs";
import { Button } from '@/components/cva/button/cvaButton';
import CompleteSection from './TodoSections/CompleteSection';

export default function TaskManager() 
{
    const taskManagerContext = useTaskManagerContext();
    const containerRef = useRef(null);

    const [minimizeIncomplete, setMinimizeIncomplete] = useState(false);
    const [minimizeComplete, setMinimizeComplete] = useState(false);

    return (
        <Container flow='col' itemsItem='start' justifyItem='start' wrap='no-wrap' className='p-2 space-y-5 w-full h-[77vh] overflow-y-scroll select-none'>
            
            <MorphicElement className='flex flex-row flex-wrap items-center justify-start gap-2 w-full'>
                
                <Wrapper flow='row' wrap='no-wrap' alignItem='center' justifyItem='between' className='w-full pr-2'>
                    <Typography variant={'h2'}>Incomplete</Typography>

                    <IoMdArrowDropdown 
                        size='2rem'
                        className='text-theme-textPrimary hover:bg-theme-hoverBgTertiary p-1 rounded-xl' 
                        onClick={() => setMinimizeIncomplete(!minimizeIncomplete)}
                        style={{transform : `rotate(${minimizeIncomplete ? 180 : 0}deg)`}}
                    />
                </Wrapper>
                <Divider className='bg-theme-borderPrimary'/>

                <MorphicElement 
                    style={{
                        height : minimizeIncomplete ? '0px' : 'auto',
                        transition : 'height 0.1s ease-out'
                    }} 
                    element='ul' 
                    className='flex flex-col items-start justify-start w-full space-y-2 overflow-hidden'>
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
                </MorphicElement>
            </MorphicElement>
    
            <CompleteSection onMinimize={() => setMinimizeComplete(!minimizeComplete)} isMinimized={minimizeComplete}>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
                <TodoItem todoLayoutMode={taskManagerContext.layoutMode}/>
            </CompleteSection>

        </Container>
    )
}
