import { useState, useEffect, useCallback, useRef, useMemo, memo, useContext } from 'react';

import { TaskGroupPanelItem } from './TaskPanelItem';
import { Container } from '@/components/container/container';
import CreateColumn from './CreateColumn';

import { BarLoader } from 'react-spinners';

import { useTaskContext } from '@/contextAPI/TaskContextAPI';
import { useInsideClick, useKeyPress, useFetch, useLocalStorage } from '@/hooks/hooksExporter';

export default function TaskGroupPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);
    const [showFocus, setShowFocus] = useState(false);
    const [todos, setTodos] = useState([]);

    const [ localstoredTodo, setLocalstoredTodo ] = useLocalStorage('todos', []);
    const { response } = useFetch('https://jsonplaceholder.typicode.com/todos', 'GET', localstoredTodo?.length < 1);

    const ref = useRef(null);
    const [isFocused] = useInsideClick(ref); // if the ref element is focused or not (boolean)
    
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


    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Home', handleNavigateStart);
    useKeyPress('Home', handleNavigateEnd);
    useKeyPress('Enter', handleEnter);
    useKeyPress('Escape', () => setShowFocus(false));

    // ------------------------- Optimization -------------------------

    // Memoized version of TodoColumnItem component
    const MemoizedTaskGroupPanelItem = useMemo(() => {
        return memo(TaskGroupPanelItem, (prevProps, nextProps) => {
            // Only re-render if active or keyboardFocus props change
            return prevProps.active === nextProps.active && prevProps.keyboardFocus === nextProps.keyboardFocus && prevProps.isFocused === nextProps.isFocused;
        })
    }, [])

    const override = {
        backgroundColor: "black",
        width : '100%'
    }

    return useMemo(() => (
        <div  className='dark:text-white dark:bg-[--dark-bg-secondary] bg-[--light-primary] w-[30vw] h-[87vh] space-y-2 pt-2 pl-1'>
            <Container 
                flow='col' 
                alignItem='start' 
                justifyItem='start' 
                wrap='no-wrap' 
                className=' h-[75vh] w-full pt-2 overflow-y-scroll'
                ref={ref}>
                {
                    todos?.length && todos?.length > 0 ? (
                        todos.map((todo, index) => (
                            <MemoizedTaskGroupPanelItem
                                key={todo.title}
                                title={todo.title}
                                active={activeIndex === index}
                                keyboardFocus={focusIndex === index && isFocused && showFocus}
                                isFocused={isFocused}
                                onClick={() => handleTodoClick(index)}
                            />
                        ))
                    )
                    :
                    (
                        <BarLoader 
                            color='white' 
                            loading={todos?.length < 1}
                            cssOverride={override}
                        />
                    )
                }
            </Container>
            <CreateColumn/>
        </div>
    ))
}