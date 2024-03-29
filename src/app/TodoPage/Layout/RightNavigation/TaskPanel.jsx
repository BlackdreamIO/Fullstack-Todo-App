import { TaskManagerContextProvider } from "@/contextAPI/TaskManagerContextAPI";
import TaskManager from "./TaskManager";
import TaskPanelNavbar from "./TaskPanelNavbar";
import { TaskContextProvider } from "@/contextAPI/TaskContextAPI";

export default function TaskPanel() 
{
    return (
        <div className='h-[87vh] w-full cursor-default space-y-5'>
            <TaskPanelNavbar/>
            <TaskManager />
        </div>
    )
}
