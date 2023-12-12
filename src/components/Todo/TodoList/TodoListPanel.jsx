import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Stack } from '@mui/material';
import { TodoListPanelNavbar } from './TodoListPanelNavbar';
import { TodoItem } from './TodoItem';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

import {  GetUserDocuments, UserDocument, GetSingleDocument, GetSpecificTodo } from '../../../function/todoFirebase';
import { auth } from '../../../database/firebase';
import { CreateTodo } from './CreateTodo';

export default function TodoListPanel() 
{
    const [value, setValue] = React.useState('recents');

    const [todoItems, setTodoItems] = useState([]);

    const { todoID } = useParams();

    const GetTodos = async () => {
        try 
        {
            const response = await GetSingleDocument({ documentID: todoID});
            setTodoItems(Object.values(response));
        }  
        catch (error) 
        {
            console.log("failed");
        }
    }

    useEffect(() => {
        if(auth.currentUser){ 
            GetTodos(); 
        }
    }, [auth.currentUser, todoID])

    useEffect(() => {
        const filterTodo = todoItems.filter((todo) => todo.title === 'fullstack youtube clone');
        console.log();
    }, [todoItems])

    const onTodoEdit = (title) => {
        try 
        {
            const filterTodo = todoItems.filter((todo) => todo.title === title); 
            console.log(filterTodo);  
        } 
        catch (error) {}
    }
    
    
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const BottomNavigationActionStyle = 'bg-black hover:text-black dark:hover:bg-white dark:hover:text-black dark:text-neutral-500 dark:focus:text-white dark:focus:hover:text-black transition-all'

    const isDarkMode = document.documentElement.className === 'dark' ? true : false;

    return (
        <Box className='w-9/12 bg-neutral-200 dark:bg-[rgb(5,5,5)] h-screen dark:border-neutral-800'>
            <TodoListPanelNavbar/>

            <Stack className='flex flex-col items-center justify-start dark:bg-neutral-900 w-full h-[80vh] p-1'>
                {
                    todoItems.map((todo,i) => (
                        <div key={i} className='w-full m-0'>
                            {
                                todo && todo.title && todo.title.length > 2 && (
                                    <TodoItem onTodoEdit={onTodoEdit} title={todo.title} key={i} />
                                )
                            }
                        </div>
                    ))
                }
            </Stack>

            <CreateTodo />

            <BottomNavigation className='w-full dark:bg-[rgb(5,5,5)]' value={value} onChange={handleChange}>
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Complete" value="Completed" icon={<AssignmentTurnedInOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Pending" value="Pending" icon={<HourglassEmptyOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Archive" value="Archive" icon={<ArchiveOutlinedIcon />} />
            </BottomNavigation>
        </Box>
    )
}
