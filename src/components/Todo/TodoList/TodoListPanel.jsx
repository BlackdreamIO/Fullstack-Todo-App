import React from 'react';

import { Box, Stack } from '@mui/material';
import { TodoListPanelNavbar } from './TodoListPanelNavbar';
import { TodoItem } from './TodoItem';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
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

    const BottomNavigationActionStyle = 'bg-black hover:text-black dark:hover:bg-white dark:hover:text-black dark:text-neutral-500 dark:focus:text-white dark:focus:hover:text-black transition-all'

    const isDarkMode = document.documentElement.className === 'dark' ? true : false;

    return (
        <Box className='w-9/12 bg-neutral-200 dark:bg-[rgb(5,5,5)] h-screen dark:border-neutral-800'>
            <TodoListPanelNavbar/>

            <Stack className='flex flex-col items-center justify-start dark:bg-neutral-900 w-full h-[80vh] p-1'>
                <TodoItem title='0x3f72a8d1'/>
                <TodoItem title='0x9bc2e4f7'/>
                <TodoItem title='0x5a9d8b10'/>
                <TodoItem title='0x46f1c35a'/>
                <TodoItem title='0x1e7a0b94'/>
            </Stack>

            <BottomNavigation className='w-full dark:bg-[rgb(5,5,5)]' value={value} onChange={handleChange}>
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Complete" value="Completed" icon={<AssignmentTurnedInOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Pending" value="Pending" icon={<HourglassEmptyOutlinedIcon />} />
                <BottomNavigationAction sx={{ '&.Mui-selected': { color: isDarkMode ? 'white' : 'black' }}} className={BottomNavigationActionStyle} label="Archive" value="Archive" icon={<ArchiveOutlinedIcon />} />
            </BottomNavigation>
        </Box>
    )
}
