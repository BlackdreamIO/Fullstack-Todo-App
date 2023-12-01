import React, { useState } from 'react';

import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Search  } from '@mui/icons-material';

import {TodoColumn } from './TodoColumn';
import { ColumnCreateDialog } from './ColumnCreateDialog';

export default function TodoColumnPanel() 
{
    const [open, setOpen] = useState(false);

    return (
        <section className='dark:bg-[rgb(5,5,5)] h-screen w-3/12 p-1'>
            
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
