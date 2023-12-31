import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Box, Input, Fab, Menu, MenuItem, Typography, Divider } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { InfoNotification, ErrorNotification } from '../../Tostify/NotificationManager';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const CreateTodo = ({ onCreate, ref }) => {
    
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [todoName, setTodoName] = useState('');

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () =>  setAnchorElUser(null);

    const handleCreate = () => {
        if(todoName.length > 2)
        {
            if(onCreate != null) { onCreate(todoName); }
        }
        else
        {
            ErrorNotification({message:'Failed To Create New Todo Please Enter A Name With Then Length Of 3 Or Higher', icon : <ErrorOutlineIcon/>});
        }
    }

    const handleKeyInput = (e) => {
        if(e.key === 'Enter') { handleCreate(); }
    }

    const menuItemStyle = `dark:!bg-neutral-950 dark:hover:!bg-[mediumspringgreen] dark:!text-neutral-500 dark:hover:!text-black !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900`;
    const isDarkMode = document.documentElement.className === 'dark' ? true : false;

    return (
        <Box className='w-full flex flex-row items-center justify-between dark:bg-neutral-900'>
            <Input 
                disableUnderline
                placeholder='Todo Name'
                onKeyDown={handleKeyInput}
                onChange={(e) => setTodoName(e.target.value)}
                ref={ref}
                className='w-11/12 dark:text-neutral-400 dark:bg-black dark:hover:bg-neutral-950 dark:hover:text-white 
                ml-2 pt-1 pb-1 pl-4 pr-4 mb-2 rounded-[10px] transition duration-300 !cursor-default !font-mono
                border-[1px] dark:border-neutral-900 dark:hover:border-neutral-100 border-black dark:selection:bg-emerald-200 dark:selection:text-black
                shadow-md shadow-transparent hover:shadow-black focus:shadow-black checked:shadow-black' 
            />
            <Fab onClick={handleOpenUserMenu} size="small" aria-label="add" className='!mb-4 !ml-5 !mr-5'>
                <AddIcon />
            </Fab>

            <Menu sx={{ mr: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left', }} 
                    keepMounted
                    transformOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    open={Boolean(anchorElUser)} 
                    onClose={handleCloseUserMenu} 
                    slotProps={{
                        paper:{
                            sx:{
                                backgroundColor: isDarkMode ? "rgb(10,10,10)" : "rgb(200,200,200)", 
                                border:`1px solid ${ isDarkMode ? 'rgb(60,60,60)' : 'black'}`, padding:'0$'
                            }
                        }
                    }}
                >
                <MenuItem className={menuItemStyle} onClick={() => handleCreate()}>
                    <Typography textAlign="center" fontSize={"0.8rem"}>ADD</Typography>
                </MenuItem>

                <Divider className='dark:bg-white mb-5' />

                <MenuItem className={menuItemStyle} onClick={() => {}}>
                    <Typography textAlign="center" fontSize={"0.8rem"}>INCOMPLETE</Typography>
                </MenuItem>
                <MenuItem className={menuItemStyle} onClick={() => {}}>
                    <Typography textAlign="center" fontSize={"0.8rem"}>PENDING</Typography>
                </MenuItem>
                <MenuItem className={menuItemStyle} onClick={() => {}}>
                    <Typography textAlign="center" fontSize={"0.8rem"}>COMPLETE</Typography>
                </MenuItem>
            </Menu>
            <Toaster/>
        </Box>
    )
}