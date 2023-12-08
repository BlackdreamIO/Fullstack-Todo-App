import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Tooltip, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteUserDocument } from '../../function/todoFirebase';

import { useTodoContext } from '../../contextAPI/TodoContex';

export const TodoListPanelNavbar = ({onThemeSelect, onDocumentDeletion, onCompleteTodoAll}) => {
    
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { todoID } = useParams(); // app/blogs/shorts/<shortsID>

    const { contextDeleteCall } = useTodoContext();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleThemeSelect = (e) => {
        contextDeleteCall();
    }
    
    const handleDocumentDeletion = () => DeleteUserDocument({documentID:todoID}).then(() => contextDeleteCall());
    
    const handleCompleteTodoAll = () => {
        if(onCompleteTodoAll != null) {
            onCompleteTodoAll();
        }
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='dark:!bg-neutral-950 !bg-neutral-300 dark:!border-l-[1px] border-b-[1px] dark:!border-neutral-900 pl-2 pr-2'>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h1" component="h2" fontSize={"1rem"} className='dark:!text-neutral-200 !text-neutral-900 !font-bold dark:!font-bold'>{todoID}</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }} >
                        <Tooltip title="Option">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MoreVertIcon className='dark:text-white' />
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} slotProps={{paper:{sx:{backgroundColor:"transparent"}}}}
                            >

                            <MenuItem className='dark:!bg-neutral-900 dark:hover:!bg-white dark:!text-neutral-500 dark:hover:!text-black !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900' onClick={() => handleThemeSelect()}>
                                <Typography textAlign="center" fontSize={"0.8rem"}>SELECT THEME</Typography>
                            </MenuItem>
                            <MenuItem className='dark:!bg-neutral-900 dark:hover:!bg-red-500 dark:!text-neutral-500 dark:hover:!text-white !text-black hover:!text-white !bg-neutral-200 hover:!bg-red-500' onClick={() => handleDocumentDeletion()}>
                                <Typography textAlign="center" fontSize={"0.8rem"}>DELETE THIS DOCUMENT</Typography>
                            </MenuItem>
                            <MenuItem className='dark:!bg-neutral-900 dark:hover:!bg-white dark:!text-neutral-500 dark:hover:!text-black !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900' onClick={() => handleCompleteTodoAll()}>
                                <Typography textAlign="center" fontSize={"0.8rem"}>COMPLETE ALL TODO</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
