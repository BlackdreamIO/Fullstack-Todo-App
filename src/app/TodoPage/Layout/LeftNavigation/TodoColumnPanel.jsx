import { useState, useEffect, useCallback, useRef } from 'react';
import { useKeyPressEvent } from 'react-use';
import { useInsideClick } from '@/hooks/useRefFocus';

import { TodoColumnItem } from './TodoColum';
import { Container } from '@/components/container/container';
import CreateColumn from './CreateColumn';

export default function TodoColumnPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);
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
    }, [])
    
    const handleTodoClick = useCallback((index) => {
        setActiveIndex(index);
    })

    useKeyPressEvent('ArrowUp', () => {
        // same as arrowDown function this one does the revert when the user press arrowUp then it will |
        // decrease activeIndex by untill these condition become true |
        // activeIndex should be greater then 0 and also it should be smaller then the todo length array |
        if(isFocused) {
            setActiveIndex(activeIndex - 2 <= todos.length && activeIndex > 0 ? (activeIndex - 1) : todos.length - 1);
        }
    })

    useKeyPressEvent('ArrowDown', () => {
        // increase the active number by 1 until activeIndex reach todo Array Length |
        // if the activeIndex reach the end then set it back to first element or _0_ |
        if (isFocused) setActiveIndex(activeIndex + 2 <= todos.length ? (activeIndex + 1) : 0);
    })

    return (
        <div ref={ref} className='dark:text-white dark:bg-[--darkSecondary] bg-[--lightPrimary] w-[25%] h-[87vh] space-y-2 pt-2 pl-1'>
            <CreateColumn/>
            <Container 
                flow='col' 
                alignItem='start' 
                justifyItem='start' 
                wrap='no-wrap' 
                className=' h-[75vh] w-full pt-2 overflow-y-scroll'>
                {
                    todos.map((todo, index) => (
                        <TodoColumnItem 
                            key={todo.title}
                            title={todo.title} 
                            active={activeIndex === index ? true : false} 
                            onClick={() => handleTodoClick(index)}
                        />
                    ))
                }
            </Container>
        </div>
    )
}