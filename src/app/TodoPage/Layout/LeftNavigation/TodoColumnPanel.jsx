import { useState, useEffect, useCallback, useRef } from 'react';
import { useKeyPressEvent } from 'react-use';

import ProfileSection from './ProfileSection';
import { TodoColumnItem } from './TodoColum';
import { Container } from '@/components/container/container';
import BottomNavigationStatus from '../BottomNavigation/BottomNavigationStatus';
import CreateColumn from './CreateColumn';

import { useInsideClick } from '@/hooks/useRefFocus';

export default function TodoColumnPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [columnItem, setColumnItem] = useState(Array(40).fill(true).map((x, i) => `Todo Column Test ${i}`))

    const [todos, setTodos] = useState([]);
    const ref = useRef(null);

    const [useInTarget] = useInsideClick(ref);

    useEffect(() => {
        if(localStorage.key('todos') && localStorage.getItem('todos')) 
        {
            const localStorageTodos = JSON.parse(localStorage.getItem('todos'));
            const slicedData = localStorageTodos.slice(0, 5);
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
    
    const handleTodoClick = (index) => {
        setActiveIndex(index);
    }

    useKeyPressEvent('ArrowUp', () => {
        // same as arrowDown function this one does the revert when the user press arrowUp then it will |
        // decrease activeIndex by untill these condition become true |
        // activeIndex should be greater then 0 and also it should be smaller then the todo length array |
        if(useInTarget) {
            setActiveIndex(activeIndex - 2 <= todos.length && activeIndex > 0 ? (activeIndex - 1) : todos.length - 1);
        }
    })

    useKeyPressEvent('ArrowDown', () => {
        // increase the active number by 1 until activeIndex reach todo Array Length |
        // if the activeIndex reach the end then set it back to first element or _0_ |
        if (useInTarget) setActiveIndex(activeIndex + 2 <= todos.length ? ( activeIndex + 1) : 0);
    })

    const handleClick = (e) => {
        if(ref.current.contains(e.target)) {
            console.log('Mouse clicked inside the div');
        }
    }

    return (
        <div ref={ref} className='dark:text-white dark:bg-[--darkSecondary] bg-[--lightPrimary] w-[250px] h-[87vh]'>
            <CreateColumn/>
            <Container 
                flow='col' 
                alignItem='start' 
                justifyItem='start' 
                wrap='no-wrap' 
                className=' h-[75vh] w-[250px] pt-2 overflow-y-scroll'
                
                onClick={(e) => handleClick(e)}
                >
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
            
            {/* <BottomNavigationStatus/> */}
        </div>
    )
}