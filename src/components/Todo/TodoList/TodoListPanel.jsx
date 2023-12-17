import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Stack } from '@mui/material';
import { TodoListPanelNavbar } from './TodoListPanelNavbar';
import { TodoItem } from './TodoItem';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

import { GetUserDocuments, DeleteTodo, GetSingleDocument, CreateNewTodo, UpdateTodo } from '../../../function/todoFirebase';
import { auth } from '../../../database/firebase';
import { CreateTodo } from './CreateTodo';

import { Toaster } from 'react-hot-toast';
import { InfoNotification, ErrorNotification } from '../../Tostify/NotificationManager';
import BeenhereIcon from '@mui/icons-material/Beenhere';

export default function TodoListPanel() 
{
    const [currentPanel, setCurrentPanel] = React.useState('recents');
    const [responseTodo, setResponseTodo] = useState([]);
    const [todoItems, setTodoItems] = useState([]);
    const { todoID } = useParams();

    const inputRef = useRef();
    const editInputRef = useRef();

    const GetTodos = async () => {
        try 
        {
            const response = await GetSingleDocument({ documentID: todoID});
            setResponseTodo(Object.values(response));
            setTodoItems(Object.values(response));
        }  
        catch (error) 
        {
            console.log("failed");
        }
    }

    const handleTodoItemChange = (event, newValue) => setCurrentPanel(newValue);

    useEffect(() => { if(auth.currentUser) { GetTodos(); } }, [auth.currentUser, todoID]);

    useEffect(() => {
        // Filter and update todoItems based on responseTodo
        const filteredTodos = responseTodo.filter(todo => todo && todo.title && todo.title.length > 2);
        setTodoItems(filteredTodos);
    }, [responseTodo]);
    

    const onTodoEdit = async (title) => {
        await UpdateTodo({documentID: todoID, newState : 'pending', todoName: title})
            .finally(() => GetTodos());
    }

    const handleTodoCreate = async (value) => {

        setTimeout(() => {
            const foundTodo = todoItems.find((todo) => todo.title === value);
            const todoExist = foundTodo != null ? true : false;
            if(todoExist) 
            {
                ErrorNotification({message:"An Todo Already Exist ! ", icon : <BeenhereIcon />});
                return;
            }
            else if(!todoExist)
            {
                CreateNewTodo({ documentID : todoID, status : 'pending', title : value })
                    .then(() => {
                        GetTodos();
                        InfoNotification({message:`Created : ${value}`, icon : <BeenhereIcon />})
                    })
                    .catch((err) => ErrorNotification({message:err}));
            }
        }, 500);
    }

    const onTodoDelete = async (todoName) => {
        await DeleteTodo({documentID: todoID, title: todoName})
            .then(() => InfoNotification({message:`Deleted : ${todoName}`, icon : <BeenhereIcon />}))
            .catch(() => ErrorNotification({message:"Failed To Delete", icon : <BeenhereIcon />}))
            .finally(() => GetTodos());
    }

    const BottomNavigationActionStyle = 'bg-black hover:text-black dark:hover:bg-white dark:hover:text-black dark:text-neutral-500 dark:focus:text-white dark:focus:hover:text-black transition-all'

    const isDarkMode = document.documentElement.className === 'dark' ? true : false;

    return (
        <Box className='w-9/12 bg-neutral-200 dark:bg-[rgb(5,5,5)] h-screen dark:border-neutral-800'>
            <TodoListPanelNavbar/>

            <Stack className='flex flex-col items-center justify-start dark:bg-yellow-500 w-full h-[72vh] p-1 overflow-y-scroll overflow-x-hidden'>
                {
                    todoItems.map((todo,i) => (
                        <div key={i} className='w-full m-0'>
                            {
                                todo && todo.title && todo.title.length > 2 && (
                                    <TodoItem 
                                        onTodoEdit={onTodoEdit} 
                                        onDelete={onTodoDelete} 
                                        title={todo.title} 
                                        key={i}
                                        ref={editInputRef}
                                    />
                                )
                            }
                        </div>
                    ))
                }
            </Stack>

            <CreateTodo onCreate={handleTodoCreate} ref={inputRef} />

            <BottomNavigation className='w-full dark:bg-[rgb(5,5,5)]' value={currentPanel} onChange={handleTodoItemChange}>
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Complete" value="Completed" icon={<AssignmentTurnedInOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Pending" value="Pending" icon={<HourglassEmptyOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Archive" value="Archive" icon={<ArchiveOutlinedIcon />} />
            </BottomNavigation>

            <Toaster/>
        </Box>
    )
}
