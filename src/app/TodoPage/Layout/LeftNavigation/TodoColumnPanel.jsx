import { useState, useEffect, useCallback } from 'react';

import ProfileSection from './ProfileSection';
import { TodoColumnItem } from './TodoColum';
import { Container } from '@/components/container/container';
import BottomNavigationStatus from '../BottomNavigation/BottomNavigationStatus';
import CreateColumn from './CreateColumn';

export default function TodoColumnPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);

    const [columnItem, setColumnItem] = useState(Array(40).fill(true).map((x, i) => `Todo Column Test ${i}`))

    const [todos, setTodos] = useState([])

    useEffect(() => {
        if(localStorage.key('todos') && localStorage.getItem('todos')) 
        {
            const localStorageTodos = JSON.parse(localStorage.getItem('todos'));
            const slicedData = localStorageTodos.slice(0, 30);
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
    
    const handleTodoClick = useCallback(index => {
        setActiveIndex(index);
    }, [])

    return (
        <div className='dark:text-white dark:bg-[--darkSecondary] bg-[--lightPrimary] w-[250px] h-[87vh]'>
            <CreateColumn/>
            <Container flow='col' alignItem='start' justifyItem='start' wrap='no-wrap' className=' h-[75vh] w-[250px] pt-2 overflow-y-scroll'>
                {/* {
                    columnItem.map((v, i) => (
                        <TodoColumnItem 
                            key={v}
                            title={v} 
                            active={activeIndex === i ? true : false} 
                            onClick={() => setActiveIndex(i)}
                        />
                    ))
                } */}
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