import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack'
import { ThemeSwitch } from './ThemeToggle';

import SwitchThemeFunction from '../function/themeManager';

export default function Navbar() 
{
    const [darkMode, setDarkMode] = useState(false);
    const [showStack, setShowStack] = useState(false);

    useEffect(() => {
      window.addEventListener('resize', () => {
        setShowStack(window.innerWidth < 375 ? true : false);
      })
    }, [])
    

    const handleClick = () => {
        if(darkMode) 
        {
            setDarkMode(false);
            SwitchThemeFunction(darkMode);
        }
        else if(!darkMode)
        {
            setDarkMode(true);
            SwitchThemeFunction(darkMode);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className='bg-neutral-200 dark:bg-neutral-950' >

                    <Typography className='text-black dark:text-white' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo App
                    </Typography>
                    
                    <Button className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' variant='contained' size='small' style={{marginRight:'2%', display: showStack ? "none" : "block"}}>LOG IN</Button>
                    <Button className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' variant='contained' size='small' style={{marginRight:'2%', display: showStack ? "none" : "block"}}>SIGN UP</Button>
                    <ThemeSwitch className={`${showStack} ? 'hidden' : 'visited:'`} defaultChecked={true} onClick={() => handleClick()} />
                </Toolbar>
                <Stack className='dark:bg-neutral-950 bg-neutral-200' sx={{ display: showStack ? 'flex' : 'none'}}>
                    <Container sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                        <Button className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' variant='contained' size='small' style={{marginRight:'2%'}}>LOG IN</Button>
                        <Button className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' variant='contained' size='small' style={{marginRight:'2%'}}>SIGN UP</Button>
                    </Container>
                    {/* <ThemeSwitch defaultChecked={true} onClick={() => handleClick()} /> */}
                </Stack>
            </AppBar>
        </Box>
    )
}
