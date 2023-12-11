import React, { useState, useEffect } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Checkbox, checkboxClasses, Menu, MenuItem, IconButton, Typography, Toolbar, AppBar, Button, Input } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export const TodoItem = ({title='', onTodoEdit}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorChild, setAnchorChild] = useState(null);
    const [todoCheck, setTodoCheck] = useState(true);

    const [todoColor, setTodoColor] = useState('red');
    const [completeTodo, setCompleteTodo] = useState(true);
    const [pendingTodo, setPendingTodo] = useState(true);

    const todoMode = {
        incomplete : 'red',
        pending : 'orange',
        complete : '#00FF3C'
    }

    const handleMenu = (event) => setAnchorEl(event.currentTarget); // open menu at target

    const handleMenuClose = () => setAnchorEl(null); // close menu

    const handleChildMenu = (event) => setAnchorChild(event.currentTarget);

    const handleCloseChildMenu = () => setAnchorChild(null);

    const handleCompleteClick = () => {
        setCompleteTodo((prev) => !prev);
        setTodoColor(completeTodo ? todoMode.complete : todoMode.incomplete);
        if(!pendingTodo)
        {
            setPendingTodo(false);
        }
    }
    const handlePendingClick = () => {
        setPendingTodo((prev) => !prev);
        setTodoColor(pendingTodo ? todoMode.pending : todoMode.incomplete);
        if(!completeTodo)
        {
            setCompleteTodo(false);
        }
    }

    const handleOnTodoEdit = () => {
        if(onTodoEdit != null){
            onTodoEdit(title);
        }
    }

    const menuItemStyle = `dark:!bg-neutral-950 dark:hover:!bg-neutral-900 dark:!text-neutral-500 dark:hover:!text-white !text-black hover:!text-white !bg-neutral-200 hover:!bg-neutral-900`;
    const isDarkMode = document.documentElement.className === 'dark' ? true : false;

    return (
       <AppBar position="static" className='dark:bg-black dark:hover:bg-[rgb(5,5,5)] dark:border-black dark:hover:border-neutral-800 border-[1px] p-0 w-full mb-2 mt-2'>
            <Toolbar style={{padding:'0%'}} onDoubleClickCapture={() => handleCompleteClick()} onContextMenu={handleMenu} >
                <Checkbox 
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CircleIcon />}
                    onChange={() => setTodoCheck()}
                    checked={todoCheck}
                    className='dark:text-neutral-700 dark:hover:text-white'
                    sx={{[`&, &.${checkboxClasses.checked}`]: {
                        color: todoColor,
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
                    onClose={handleMenuClose}
                    onContextMenu={() => setAnchorEl(Boolean(false))}>

                   <MenuItem onClick={() => handleCompleteClick()} className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>
                            {completeTodo ? 'Add' : 'Remove'} To Complete
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handlePendingClick()} className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>
                            {pendingTodo ? 'Add' : 'Remove'} To Pedning
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleChildMenu} className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>Open Child</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {}} className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>Delete</Typography>
                    </MenuItem>
                </Menu>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorChild}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
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
                    open={Boolean(anchorChild)}
                    onClose={handleCloseChildMenu}>
                    
                    <MenuItem onClick={() => {}} className={menuItemStyle}>
                        <Input placeholder='Name'/>
                    </MenuItem>
                    <MenuItem onClick={() => {}} className={menuItemStyle}>
                        <Typography textAlign="center" fontSize={"0.8rem"}>Ok</Typography>
                    </MenuItem>
                            
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
