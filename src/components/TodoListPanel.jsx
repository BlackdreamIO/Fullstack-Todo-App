import React from 'react';

import { Box, Stack } from '@mui/material';
import { TodoListPanelNavbar } from './TodoListPanelNavbar';
import { TodoItem } from './TodoItem';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

export default function TodoListPanel() 
{
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box className='w-9/12 bg-neutral-200 dark:bg-[rgb(5,5,5)] h-screen dark:border-neutral-800'>
            <TodoListPanelNavbar/>

            <Stack className='dark:bg-neutral-900 w-full h-[80vh]'>
                <TodoItem/>
            </Stack>

            <BottomNavigation className='w-full dark:bg-[rgb(5,5,5)]' value={value} onChange={handleChange}>
                <BottomNavigationAction className='dark:text-neutral-500 dark:focus:text-white dark:target:text-cyan-500' label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction className='dark:text-neutral-500 dark:focus:text-white' label="Complete" value="Completed" icon={<AssignmentTurnedInOutlinedIcon />} />
                <BottomNavigationAction className='dark:text-neutral-500 dark:focus:text-white' label="Pending" value="Pending" icon={<HourglassEmptyOutlinedIcon />} />
                <BottomNavigationAction className='dark:text-neutral-500 dark:focus:text-white' label="Archive" value="Archive" icon={<ArchiveOutlinedIcon />} />
            </BottomNavigation>
        </Box>
    )
}
