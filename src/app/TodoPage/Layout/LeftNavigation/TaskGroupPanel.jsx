import { useState, useEffect, useCallback, useRef, useMemo, memo, useContext } from 'react';

import { TaskGroupPanelItem } from './TaskPanelItem';
import { Container } from '@/components/container/container';
import { MorphicElement } from '@/components/morphicElement';
import CreateTaskGroup from './CreateTaskGroup'; './CreateTaskGroup';

import { BarLoader } from 'react-spinners';
import { LuAlignLeft, LuAlignRight } from "react-icons/lu";

import { useTaskContext } from '@/contextAPI/TaskContextAPI';
import { useInsideClick, useKeyPress, useFetch, useLocalStorage } from '@/hooks/hooksExporter';

export default function TaskGroupPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);
    const [showFocus, setShowFocus] = useState(false);
    const [todos, setTodos] = useState([]);
    
    const [currentWidth, setCurrentWidth] = useState('30vw');
    const [todoMinimizeMode, setTodoMinimizeMode] = useState(false);
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);

    const [ localstoredTodo, setLocalstoredTodo ] = useLocalStorage('todos', []);
    const { response } = useFetch('https://jsonplaceholder.typicode.com/todos', 'GET', localstoredTodo?.length < 1);

    const groupPanelRef = useRef(null);
    const [isFocused] = useInsideClick(groupPanelRef); // if the groupPanelRef element is focused or not (boolean)
    const taskContext = useTaskContext(); // TaskContextAPI { selectedGroup, setSelectedGroup }

    useEffect(() => {
        const localStorageDataExist = localstoredTodo && localstoredTodo?.length > 0;
        if(localStorageDataExist) {
            setTodos(localstoredTodo.slice(0,10));
        }
        else {
            setLocalstoredTodo(response);
            setTodos(response);
        }
    }, [response, localstoredTodo])
    
    useEffect(() => {
        if(todos?.length > 0) {
            taskContext.setSelectedTaskGroup(todos[0].title);
        }
    }, [todos])
    
    useEffect(() => {
        if(focusIndex === activeIndex) setShowFocus(false);
    }, [focusIndex])

    const handleTodoClick = useCallback((index) => {
        setActiveIndex(index);
        setFocusIndex(index);
        taskContext.setSelectedTaskGroup(todos[index].title);
    }, [todos])

    const handleArrowUp = useCallback(() => {
        if (isFocused) {
            setShowFocus(true);
            setFocusIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }
    }, [isFocused]);

    const handleArrowDown = useCallback(() => {
        if (isFocused) {
            setShowFocus(true);
            setFocusIndex(prevIndex => Math.min(prevIndex + 1, todos.length - 1));
        }
    }, [isFocused, todos?.length]);

    const handleEnter = useCallback(() => {
        if (isFocused) {
            setActiveIndex(focusIndex);
            setShowFocus(false);
            taskContext.setSelectedTaskGroup(todos[focusIndex].title);
        }
    }, [focusIndex, isFocused]);

    const handleNavigateStart = () => {
        if (isFocused) {
            setShowFocus(true);
            setFocusIndex(0);
        }
    }
    const handleNavigateEnd = () => {
        if (isFocused) {
            setShowFocus(true);
            setFocusIndex(todos.length - 1);
        }
    }

    const handleSidebarClick = () => {
        setIsSidebarMinimized(prev => prev =! prev);
        if(isSidebarMinimized) {
            setCurrentWidth('10vw');
            setTodoMinimizeMode(true);
        }
        else {
            setCurrentWidth('30vw');
            setTodoMinimizeMode(false);
        }
    }

    useKeyPress('ArrowUp', handleArrowUp); // navigate up
    useKeyPress('ArrowDown', handleArrowDown); // navigate down
    useKeyPress('Home', handleNavigateStart); // navigate to the first index
    useKeyPress('End', handleNavigateEnd); // navigate to the last index
    useKeyPress('Enter', handleEnter); // select the current
    useKeyPress('l', () =>{ if(isFocused) handleSidebarClick()}); // toggle sidebar
    useKeyPress('Escape', () => setShowFocus(false));

    // ------------------------- Optimization -------------------------

    // Memoized version of TodoColumnItem component
    // Only re-render if active or keyboardFocus props change
    const MemoizedTaskGroupPanelItem = useMemo(() => {
        return memo(TaskGroupPanelItem, (prevProps, nextProps) => {
            return  prevProps.active === nextProps.active && 
                    prevProps.keyboardFocus === nextProps.keyboardFocus && 
                    prevProps.isFocused === nextProps.isFocused &&
                    prevProps.minimizedMode === nextProps.minimizedMode;
        })
    }, [])

    const BarLoaderOveerideStyle = {
        backgroundColor: "black",
        width : '100%'
    }

    return useMemo(() => (
        <div style={{width: currentWidth}} className='bg-theme-bgPrimary h-[87vh] space-y-2 pt-2 pl-1 transition-all duration-300'>
            <Container flow='col' alignItem='start' justifyItem='start' wrap='no-wrap' className=' h-[75vh] w-full pt-2 overflow-y-scroll' ref={groupPanelRef}>
                {
                    todos?.length && todos?.length > 0 ? (
                        todos.map((todo, index) => (
                            <MemoizedTaskGroupPanelItem
                                key={todo.title}
                                title={todo.title}
                                isFocused={isFocused}
                                active={activeIndex === index}
                                keyboardFocus={focusIndex === index && isFocused && showFocus}
                                onClick={() => handleTodoClick(index)}
                                minimizedMode={todoMinimizeMode}
                            />
                        ))
                    )
                    :
                    (
                        <BarLoader 
                            color='white' 
                            loading={todos?.length < 1}
                            cssOverride={BarLoaderOveerideStyle}
                        />
                    )
                }
            </Container>

            <MorphicElement onClick={handleSidebarClick} tabIndex={1} element='div' className='absolute inset-y-0 my-auto -mx-10 flex items-center pointer-events-none 
                hover:-mx-0 focus:-mx-0 focus:border-none focus:outline-none transition-all duration-300 cursor-pointer'>
                <MorphicElement className='p-3 rounded-[20px] bg-theme-bgTertiary border-[4px] border-blue-900 dark:hover:border-theme-brand hover:border-theme-brand
                    pointer-events-auto shadow-[0px_0px_20px_2px_rgb(0,0,0,1)] dark:focus:broder-theme-brand focus:broder-theme-brand'>
                    { isSidebarMinimized ? <LuAlignRight size='1rem' /> : <LuAlignLeft size='1rem' /> }
                </MorphicElement>
            </MorphicElement>
            
            {
                isSidebarMinimized ? ( <CreateTaskGroup/> ) : ( <></> )
            }
        </div>
    ))
}