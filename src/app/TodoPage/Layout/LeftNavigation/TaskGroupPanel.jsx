import { useState, useEffect, useCallback, useRef, useMemo, memo, useContext } from 'react';
import { useTaskContext } from '@/contextAPI/TaskContextAPI';
import { useKeyboardNavigationContext } from '@/contextAPI/KeybaordNavigationContextAPI';

import { TaskGroupPanelItem } from './TaskPanelItem';
import { Container } from '@/components/container/container';
import { MorphicElement } from '@/components/morphicElement';
import CreateTaskGroup from './CreateTaskGroup'; './CreateTaskGroup';

import { BarLoader } from 'react-spinners';
import { LuAlignLeft, LuAlignRight } from "react-icons/lu";

import { useKeyPress, useFetch, useLocalStorage } from '@/hooks/hooksExporter';

export default function TaskGroupPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);
    const [showFocus, setShowFocus] = useState(false);
    const [tabFocused, setTabFocused] = useState(false);
    const [isItemOptionOpen, setIsItemOptionOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    
    const [currentWidth, setCurrentWidth] = useState('30vw');
    const [todoMinimizeMode, setTodoMinimizeMode] = useState(false);
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);

    const [ localstoredTodo, setLocalstoredTodo ] = useLocalStorage('todos', []);
    const { response } = useFetch('https://jsonplaceholder.typicode.com/todos', 'GET', localstoredTodo?.length < 1);

    const groupPanelRef = useRef(null);
    const taskContext = useTaskContext(); // TaskContextAPI { selectedGroup, setSelectedGroup }
    const keyboardNavigationContext = useKeyboardNavigationContext(); // { keybaordNavigationEnabled, setKeybaordNavigationEnabled }
    const kbnEnabled = keyboardNavigationContext.keybaordNavigationEnabled;

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
        if(!kbnEnabled) setShowFocus(false);
    }, [focusIndex, kbnEnabled])
    
    useEffect(() => {
      if(!tabFocused && !isItemOptionOpen) {
        handleDisableNavigation();
      }
    }, [tabFocused, isItemOptionOpen])
    

    const handleTodoClick = useCallback((index) => {
        setActiveIndex(index);
        setFocusIndex(index);
        taskContext.setSelectedTaskGroup(todos[index].title);
    }, [todos])

    const handleArrowUp = useCallback(() => {
        if (tabFocused && kbnEnabled) {
            setShowFocus(true);
            setFocusIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }
    }, [tabFocused, kbnEnabled]);

    const handleArrowDown = useCallback(() => {
        if (tabFocused && kbnEnabled) {
            setShowFocus(true);
            setFocusIndex(prevIndex => Math.min(prevIndex + 1, todos.length - 1));
        }
    }, [tabFocused, kbnEnabled, todos?.length]);

    const handleEnter = useCallback(() => {
        if (tabFocused && kbnEnabled) {
            setActiveIndex(focusIndex);
            setShowFocus(false);
            taskContext.setSelectedTaskGroup(todos[focusIndex].title);
        }
    }, [focusIndex, kbnEnabled, tabFocused]);

    const handleNavigateStart = () => {
        if (tabFocused && kbnEnabled) {
            setShowFocus(true);
            setFocusIndex(0);
        }
    }
    const handleNavigateEnd = () => {
        if (tabFocused && kbnEnabled) {
            setShowFocus(true);
            setFocusIndex(todos.length - 1);
        }
    }

    const handleSidebarClick = () => {
        if (!tabFocused && !kbnEnabled) return;

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

    const onGroupPanelFocus = () => setTabFocused(true);
    const onGroupPanelBlur = () => {
        if(!isItemOptionOpen) {
            setTabFocused(false);
        }
    }
    
    const handleDisableNavigation = () => {
        if(groupPanelRef.current) {
            groupPanelRef.current.blur();
            setTabFocused(false);
            setShowFocus(false);
        }
    }

    const handleItemOptionOpen = (isOpen) => {
        setIsItemOptionOpen(isOpen);
        if(!tabFocused && !isItemOptionOpen) {
            handleDisableNavigation();
        }
    }


    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Home', handleNavigateStart);
    useKeyPress('End', handleNavigateEnd);
    useKeyPress('Enter', handleEnter);
    useKeyPress('l', handleSidebarClick); // toggle sidebar
    useKeyPress('Escape', handleDisableNavigation);

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
        <MorphicElement style={{width: currentWidth}} className='bg-theme-bgPrimary h-[87vh] space-y-2 pt-2 pl-1 transition-all duration-300'>
            <Container 
                flow='col' 
                alignItem='start' 
                justifyItem='start' 
                wrap='no-wrap' 
                className={`h-[75vh] w-full pt-2 overflow-y-scroll border border-transparent outline-none 
                ${kbnEnabled ?'focus-visible:border-theme-borderNavigation' : ''}`}
                ref={groupPanelRef}
                tabIndex={kbnEnabled ? 1 : -1}
                onFocus={onGroupPanelFocus}
                onBlur={onGroupPanelBlur}
                >
                {
                    todos?.length && todos?.length > 0 ? (
                        todos.map((todo, index) => (
                            <MemoizedTaskGroupPanelItem
                                key={todo.title}
                                title={todo.title}
                                isFocused={tabFocused}
                                active={activeIndex === index}
                                keyboardFocus={focusIndex === index && tabFocused && showFocus}
                                onClick={() => handleTodoClick(index)}
                                optionIsOpen={(isOpen) => handleItemOptionOpen(isOpen)}
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

            <MorphicElement onClick={handleSidebarClick} element='div' className='absolute inset-y-0 my-auto -mx-10 flex items-center pointer-events-none 
                hover:-mx-0 focus:-mx-0 focus:border-none focus:outline-none transition-all duration-300 cursor-pointer'>
                <MorphicElement className='p-3 rounded-[20px] bg-theme-bgTertiary border-[4px] border-blue-900 dark:hover:border-theme-brand hover:border-theme-brand
                    pointer-events-auto shadow-[0px_0px_20px_2px_rgb(0,0,0,1)] dark:focus:broder-theme-brand focus:broder-theme-brand'>
                    { isSidebarMinimized ? <LuAlignRight size='1rem' /> : <LuAlignLeft size='1rem' /> }
                </MorphicElement>
            </MorphicElement>
            
            {
                isSidebarMinimized ? ( <CreateTaskGroup/> ) : ( <></> )
            }
        </MorphicElement>
    ))
}