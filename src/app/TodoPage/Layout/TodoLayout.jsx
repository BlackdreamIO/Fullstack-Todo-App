import { TaskContextProvider } from '@/contextAPI/TaskContextAPI';

import TaskGroupPanel from './LeftNavigation/TaskGroupPanel';
import TaskPanel from './RightNavigation/TaskPanel';

import { Container } from '@/components/container/container';

export default function TodoLayout() 
{
    return (
        <Container wrap='no-wrap' className='border-t-regulerBorder gap-0 border-theme-tertiary'>
            <TaskContextProvider>
                <TaskGroupPanel/>
                <TaskPanel />
            </TaskContextProvider>
        </Container>
    )
}
