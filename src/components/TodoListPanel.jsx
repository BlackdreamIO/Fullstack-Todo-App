import React from 'react';

import { Box, AppBar ,Typography } from '@mui/material';
import { TodoListPanelNavbar } from './TodoListPanelNavbar';

export default function TodoListPanel() 
{
    return (
        <Box className='w-9/12 bg-neutral-200 dark:bg-[rgb(5,5,5)] h-screen border-l-[1px] dark:border-neutral-800'>
            <TodoListPanelNavbar/>

            
        </Box>
    )
}
