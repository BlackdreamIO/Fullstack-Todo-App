import { TaskManagerContextProvider } from "@/contextAPI/TaskManagerContextAPI";
import TaskManager from "./TaskManager";
import TaskPanelNavbar from "./TaskPanelNavbar";

export default function TaskPanel() 
{
    return (
        <div className='h-[87vh] w-full cursor-default'>
            <TaskManagerContextProvider>
                <TaskPanelNavbar/>
                <TaskManager />
            </TaskManagerContextProvider>
        </div>
    )
}
