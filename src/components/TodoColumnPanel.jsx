import React, { useState, useEffect } from 'react';
import { Input, Divider, Tooltip, Stack } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Search from '@mui/icons-material/Search';

import {TodoColumn } from './TodoColumn';
import { ColumnCreateDialog } from './ColumnCreateDialog';

import { GetUserDocuments, UserDocument } from '../function/todoFirebase';
import { Try } from '@mui/icons-material';

export default function TodoColumnPanel() 
{
    const [open, setOpen] = useState(false);

    const abort = new AbortController(); // code: abort.signal

    useEffect(() => {
        const getData = async () => {
            try
            {
                const data = await GetUserDocuments({GetDataOf:UserDocument.ID})
                    .then((response) => (console.log(response)))
                    .catch((error) => console.log("Failed Reasone ", error));
            }
            catch (err) 
            {
                console.log("Failed To Process Fetch");
            }
        }
        getData();
    }, [])
    

    return (
        <section className='bg-neutral-300 dark:bg-[rgb(5,5,5)] h-screen w-3/12 p-1'>
            
            <div className='flex flex-row items-center justify-center mb-7'>
                <Input placeholder='Search' variant="filled" className='dark:text-white dark:placeholder:text-white dark:bg-neutral-900 dark:border-y-white mt-5 w-11/12 p-1 rounded-md'/>
                <Search className='dark:text-white absolute mt-5 ml-[18%] cursor-pointer'/>
            </div>
            
            <Divider orientation='horizontal' className='dark:bg-white mt-5 mb-5' />

            <ColumnCreateDialog open={open} onCreate={() => alert("created")} onClose={() => setOpen(false)}/>

            <Stack direction="column"  spacing={1} marginTop={2}>
                <TodoColumn Text='GURDIEN' completedTodoCount={10}/>
                <TodoColumn Text='TODO by creating a new todo column you can' completedTodoCount={4}/>
            </Stack>
            
            <div className='fixed bottom-1 mb-0 mt-0'>
                <Tooltip title={"Create New Todo Document"} placement='left-end'>
                    <AddCircleOutlineIcon onClick={() => setOpen(true)} className='ml-2 mb-5 dark:text-neutral-500 hover:dark:text-white text-5xl cursor-pointer'/>
                </Tooltip>
            </div>
        
        </section>
    )
}
