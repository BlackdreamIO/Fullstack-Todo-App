import { useState } from 'react';
import { Box, Input, Fab, Menu, MenuItem, Typography  } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

export const CreateTodo = () => {
    
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box className='w-full flex flex-row items-center justify-between dark:bg-neutral-900'>
            <Input 
                disableUnderline
                placeholder='Todo Name'
                className='w-11/12 dark:text-neutral-400 dark:bg-black dark:hover:bg-neutral-950 dark:hover:text-white 
                ml-2 pt-1 pb-1 pl-4 pr-4 mb-2 rounded-[10px] transition duration-300 !cursor-default !font-mono
                border-[1px] dark:border-neutral-900 dark:hover:border-neutral-100 border-black dark:selection:bg-emerald-200 dark:selection:text-black' 
            />
            <Fab onClick={handleOpenUserMenu} size="small" aria-label="add" className='!mb-4 !ml-5 !mr-5'>
                <AddIcon />
            </Fab>

            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left', }} keepMounted
                    transformOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} slotProps={{paper:{sx:{backgroundColor:"transparent"}}}}
                >
                <MenuItem className='dark:!bg-neutral-900 dark:hover:!bg-white dark:!text-neutral-500 dark:hover:!text-black !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900' onClick={() => handleCloseUserMenu()}>
                    <Typography textAlign="center" fontSize={"0.8rem"}>INCOMPLETE</Typography>
                </MenuItem>
                <MenuItem className='dark:!bg-neutral-900 dark:hover:!bg-white dark:!text-neutral-500 dark:hover:!text-black !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900' onClick={() => handleCloseUserMenu()}>
                    <Typography textAlign="center" fontSize={"0.8rem"}>PENDING</Typography>
                </MenuItem>
                <MenuItem className='dark:!bg-neutral-900 dark:hover:!bg-white dark:!text-neutral-500 dark:hover:!text-black !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900' onClick={() => handleCloseUserMenu()}>
                    <Typography textAlign="center" fontSize={"0.8rem"}>COMPLETE</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}