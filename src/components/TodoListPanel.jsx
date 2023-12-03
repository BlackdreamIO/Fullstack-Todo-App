import React from 'react';

import { Box, Stack } from '@mui/material';
import { TodoListPanelNavbar } from './TodoListPanelNavbar';
import { TodoItem } from './TodoItem';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

import { CheckIfDarkMode } from '../function/themeManager';

export default function TodoListPanel() 
{
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const BottomNavigationActionStyle = 'bg-black hover:text-black dark:hover:bg-white dark:hover:text-black dark:text-neutral-500 dark:focus:text-white dark:focus:hover:text-black'

    const isDarkMode = document.documentElement.className === 'dark' ? true : false;

    return (
        <Box className='w-9/12 bg-neutral-200 dark:bg-[rgb(5,5,5)] h-screen dark:border-neutral-800'>
            <TodoListPanelNavbar/>

            <Stack className='dark:bg-neutral-900 w-full h-[80vh]'>
                <TodoItem/>
            </Stack>

            <BottomNavigation className='w-full dark:bg-[rgb(5,5,5)]' value={value} onChange={handleChange}>
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} fontSize={"0.8rem"} className={BottomNavigationActionStyle} label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} fontSize={"0.8rem"} className={BottomNavigationActionStyle} label="Complete" value="Completed" icon={<AssignmentTurnedInOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} fontSize={"0.8rem"} className={BottomNavigationActionStyle} label="Pending" value="Pending" icon={<HourglassEmptyOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} fontSize={"0.8rem"} className={BottomNavigationActionStyle} label="Archive" value="Archive" icon={<ArchiveOutlinedIcon />} />
            </BottomNavigation>
        </Box>
    )
}
