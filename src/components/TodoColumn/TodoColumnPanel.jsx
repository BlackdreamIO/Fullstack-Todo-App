import React, { useState, useEffect } from 'react';
import { Input, Divider, Tooltip, Stack } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Search from '@mui/icons-material/Search';

import { TodoColumn } from '../TodoColumn/TodoColumn';
import { ColumnCreateDialog } from './ColumnCreateDialog';

import {  GetUserDocuments, UserDocument, GetSpecificTodo, HandleSiblingCall, CreateCollectionForUser } from '../../function/todoFirebase';
import { auth } from '../../database/firebase';
import { useTodoContext } from '../../contextAPI/TodoContex';

export default function TodoColumnPanel() 
{
    const [open, setOpen] = useState(false);
    const [todoDocuments, setTodoDocuments] = useState([]);

    const { isDeleteCalled } = useTodoContext();
    
    const GetTodoDocuments = async () => {
        try
        {
            const response = await GetUserDocuments({ GetDataOf: UserDocument.ID });
            setTodoDocuments(response);
        }
        catch (err) 
        {
           console.log("Failed Reason ", err);
        }
    }

    useEffect(() => {
        if(auth.currentUser)
        {
            GetTodoDocuments();
        }
    }, [isDeleteCalled, auth.currentUser])
    

    return (
        <section className='bg-neutral-300 dark:bg-[rgb(5,5,5)] h-screen w-3/12 p-1'>
            
            <div className='flex flex-row items-center justify-center mb-7'>
                <Input placeholder='Search' variant="filled" className='dark:text-white dark:placeholder:text-white dark:bg-neutral-900 dark:border-y-white mt-5 w-11/12 p-1 rounded-md'/>
                <Search className='dark:text-white absolute mt-5 ml-[18%] cursor-pointer'/>
            </div>
            
            <Divider orientation='horizontal' className='dark:bg-white mt-5 mb-5' />

            <ColumnCreateDialog open={open} onCreate={() => alert("created")} onClose={() => setOpen(false)}/>

            <Stack direction="column"  spacing={1} marginTop={2}>
                {
                    todoDocuments.map((value,index) => (
                        <TodoColumn key={value} Text={value} completedTodoCount={index}/>
                    ))
                }
                <button className='dark:text-neutral-500 dark:hover:text-white' onClick={() => CreateCollectionForUser()}>CREATE COLLECTION</button>
                <button className='dark:text-neutral-500 dark:hover:text-white' onClick={() => GetTodoDocuments()}>GET DOCUMENTS</button>
            </Stack>
            
            <div className='fixed bottom-1 mb-0 mt-0'>
                <Tooltip title={"Create New Todo Document"} placement='left-end'>
                    <AddCircleOutlineIcon onClick={() => setOpen(true)} className='ml-2 mb-5 dark:text-neutral-500 hover:dark:text-white text-5xl cursor-pointer'/>
                </Tooltip>
            </div>
        
        </section>
    )
}

