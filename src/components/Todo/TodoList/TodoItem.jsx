import React, { useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Checkbox, checkboxClasses, Menu, MenuItem, IconButton, Typography, Toolbar, AppBar, Button } from '@mui/material';

export const TodoItem = ({title=''}) => 
{
    const [anchorEl, setAnchorEl] = useState(null);
    const [todoCheck, setTodoCheck] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheck = () => {
        setTodoCheck((prev) => !prev);
    } 

    const menuItemStyle = `dark:!bg-neutral-950 dark:hover:!bg-neutral-900 dark:!text-neutral-500 dark:hover:!text-white !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900`;
    const isDarkMode = document.documentElement.className === 'dark' ? true : false;

    return (
       <AppBar position="static" className='dark:bg-black dark:hover:bg-[rgb(5,5,5)] dark:border-black dark:hover:border-neutral-800 border-[1px] p-0 w-full mb-2 mt-2'>
            <Toolbar style={{padding:'0%'}}>
                <Checkbox 
                    defaultChecked={todoCheck}
                    icon={<CheckCircleOutlineIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    onChange={() => handleCheck()}
                    value={todoCheck}
                    className='dark:text-neutral-700 dark:hover:text-white'
                    sx={{[`&, &.${checkboxClasses.checked}`]: {
                          color: 'white',
                    }}}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={`!text-base dark:text-neutral-200 text-black !font-mono !ml-2`} >
                    {title} 
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                    slotProps={{
                        paper:{
                            sx:{
                                backgroundColor: isDarkMode ? "rgb(10,10,10)" : "rgb(200,200,200)", 
                                border:`1px solid ${ isDarkMode ? 'rgb(60,60,60)' : 'black'}`, padding:'0$'
                            }
                        }
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                   <MenuItem className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>Add To Complete</Typography>
                    </MenuItem>
                    <MenuItem className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>Add To Pedning</Typography>
                    </MenuItem>
                    <MenuItem className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>Delete</Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
