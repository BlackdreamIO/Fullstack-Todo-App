import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { useInsideClick, useKeyPress } from '@/hooks/hooksExporter';

import { TodoColumnItem } from './TodoColum';
import { Container } from '@/components/container/container';
import CreateColumn from './CreateColumn';

export default function TodoColumnPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);
    const [showFocus, setShowFocus] = useState(false);

    const [columnItem, setColumnItem] = useState(Array(40).fill(true).map((x, i) => `Todo Column Test ${i}`))
    const [todos, setTodos] = useState([]);
    
    const ref = useRef(null);
    const [isFocused] = useInsideClick(ref); // if the ref element is focused or not (boolean)

    useEffect(() => {
        if(localStorage.key('todos') && localStorage.getItem('todos')) 
        {
            const localStorageTodos = JSON.parse(localStorage.getItem('todos'));
            const slicedData = localStorageTodos.slice(0, 15);
            setTodos(slicedData);
        }
        else {
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Set the fetched todos to the state
                    console.log('Request has been send');
                    const slicedData = data.slice(0, 50);
                    setTodos(slicedData);
                    localStorage.setItem('todos', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
        console.log('MESSAGES');
    }, [])
    
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
    }, [isFocused, todos.length]);

    const handleEnter = useCallback(() => {
        if (isFocused) {
            setActiveIndex(focusIndex);
            setShowFocus(false);
        }
    }, [focusIndex, isFocused]);


    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Enter', handleEnter);


    // Optimization -------------------------

    // Memoized version of TodoColumnItem component
    const MemoizedTodoColumnItem = useMemo(() => {
        return memo(TodoColumnItem, (prevProps, nextProps) => {
            // Only re-render if active or keyboardFocus props change
            return prevProps.active === nextProps.active && prevProps.keyboardFocus === nextProps.keyboardFocus;
        })
    }, [])

    return (
        <div ref={ref} className='dark:text-white dark:bg-[--darkSecondary] bg-[--lightPrimary] w-[250px] h-[87vh] space-y-2 pt-2 pl-1'>
            <CreateColumn/>
            <Container 
                flow='col' 
                alignItem='start' 
                justifyItem='start' 
                wrap='no-wrap' 
                className=' h-[75vh] w-full pt-2 overflow-y-scroll'>
                {
                    todos.map((todo, index) => (
                        <MemoizedTodoColumnItem
                            key={todo.id}
                            title={todo.title}
                            active={activeIndex === index}
                            keyboardFocus={focusIndex === index && isFocused && showFocus}
                            onClick={() => handleTodoClick(index)}
                        />
                    ))
                }
            </Container>
        </div>
    )
}