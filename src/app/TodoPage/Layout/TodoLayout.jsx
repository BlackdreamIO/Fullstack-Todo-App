
import { TaskManagerContextProvider } from '@/contextAPI/TaskManagerContextAPI';
import TaskGroupPanel from './LeftNavigation/TaskGroupPanel';
import TaskPanel from './RightNavigation/TaskPanel';

import { Container } from '@/components/container/container';
import { TaskContextProvider } from '@/contextAPI/TaskContextAPI';

export default function TodoLayout() 
{
    return (
        <Container wrap='no-wrap' className='border-t-regulerBorder gap-0 border-theme-tertiary'>
            <TaskManagerContextProvider>
                <TaskContextProvider>
                    <TaskGroupPanel/>
                    <TaskPanel />
                </TaskContextProvider>
            </TaskManagerContextProvider>
        </Container>
    )
}
