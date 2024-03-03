import { Container } from "@/components/container/container";
import { useTaskContext } from "@/contextAPI/TaskContextAPI";

export default function TaskPanelNavbar() 
{
    const taskContext = useTaskContext();

    return (
        <Container alignItem='start' justifyItem='start' className='max-w-[800px] overflow-hidden'>
            <h5 className="dark:text-white text-2xl font-mono text-left ml-2 truncate">{taskContext.selectedTaskGroup}</h5>
        </Container>
    )
}
