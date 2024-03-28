import { useState } from 'react'

import { Container } from '@/components/container/container';
import { Button } from '@/components/cva/button/cvaButton';
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

import TodoSegmentSection from './TodoSections/TodoSegmentSection';

export default function TaskManager() 
{
    const [todos, setTodos] = useState(Array(5).fill('randomXYZ'));

    return (
        <Container flow='col' itemsItem='start' justifyItem='start' wrap='no-wrap' className='p-2 space-y-5 w-full h-[75vh] overflow-y-scroll'>
    
            <TodoSegmentSection
                title='Segment Title'
                todos={todos}>
            </TodoSegmentSection>

            <TodoSegmentSection
                title='Field IYZ Segment Title ALWAYS REMEBER TITLE MUST NOT EXCEED a certeint anmount of witdh 
                or it will look horible that it does now'
                todos={todos}>
            </TodoSegmentSection>

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
