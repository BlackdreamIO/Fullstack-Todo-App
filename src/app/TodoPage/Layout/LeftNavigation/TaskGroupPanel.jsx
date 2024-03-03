import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { useInsideClick, useKeyPress, useFetch, useLocalStorage } from '@/hooks/hooksExporter';

import { TaskPanelItem } from './TaskPanelItem';
import { Container } from '@/components/container/container';
import CreateColumn from './CreateColumn';

import { BarLoader } from 'react-spinners';

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
        if(focusIndex === activeIndex) setShowFocus(false);
    }, [focusIndex])

    const handleTodoClick = useCallback((index) => {
        setActiveIndex(index);
        setFocusIndex(index);
    }, [])

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
    const MemoizedTaskPanelItem = useMemo(() => {
        return memo(TaskPanelItem, (prevProps, nextProps) => {
            // Only re-render if active or keyboardFocus props change
            return prevProps.active === nextProps.active && prevProps.keyboardFocus === nextProps.keyboardFocus;
        })
    }, [])

    const override = {
        backgroundColor: "black",
        width : '100%'
    }

    return useMemo(() => (
        <div ref={ref} className='dark:text-white dark:bg-[--darkSecondary] bg-[--lightPrimary] w-[300px] h-[87vh] space-y-2 pt-2 pl-1'>
            <CreateColumn/>
            <Container 
                flow='col' 
                alignItem='start' 
                justifyItem='start' 
                wrap='no-wrap' 
                className=' h-[75vh] w-full pt-2 overflow-y-scroll'>
                {
                    todos?.length && todos.length > 0 ? (
                        todos.map((todo, index) => (
                            <MemoizedTaskPanelItem
                                key={todo.id}
                                title={todo.title}
                                active={activeIndex === index}
                                keyboardFocus={focusIndex === index && isFocused && showFocus}
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
        </div>
    ))
}