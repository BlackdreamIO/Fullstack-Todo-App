import React, { useState, useEffect, useRef } from 'react';

import { AppBar, Box, Toolbar, Typography, Button, Container, Stack, Tooltip } from '@mui/material';
import { Person, TroubleshootRounded } from '@mui/icons-material';

import { ThemeSwitch } from './ThemeToggle';

import AuthPanel from './AuthPanel';
import { IsLoggedIn, LogOutUser } from '../function/authenticator';
import { useCurrentAuthState, useThemeManager, useWindowResize } from '../hooks/hooksExporter';

import { useCookies } from 'react-cookie';

export default function Navbar () 
{
    const [cookie, setCookie ] = useCookies(['themeCookie']);

    const [darkMode, setDarkMode] = useState(cookie.themeCookie);
    const [showStack, setShowStack] = useState(false);
    const [hasUser, setHasUser] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useCurrentAuthState();
    const [isDarkMode, setIsDarkMode] = useThemeManager();

    const childRef = useRef(null);

    useWindowResize({
        onTriggerEnter : () => setShowStack(true),
        onTriggerOut : () => setShowStack(false),
        thresholdWidth : 375
    })

    useEffect(() => {
        handleUserLogIn();
    }, [])

    useEffect(() => {
        setIsDarkMode(darkMode);
    }, [darkMode])

    const handleThemeClick = () => setDarkMode((prev) => prev =! prev);

    const handleUserLogIn = () => {
        setHasUser(JSON.parse(localStorage.getItem("user")));
        handleAuthDialog('closeDialog');
    }

    const handleAuthDialog = (_mode) => {
       // _mode === 'logIn' ?  childRef.current.ShowLogIn() : childRef.current.ShowSignUp();
        switch (_mode) 
        {
            case 'logIn':
                childRef.current.ShowLogIn();
                break;
            case 'signUp':
                childRef.current.ShowSignUp()
                break;
            case 'closeDialog':
                childRef.current.HideAuthDialog();
                break;
            default:
                break;
        }
    }

    const handleAuthState = () => {
        console.log(isLoggedIn);
    }

    return (
        <nav className='w-full'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar className='bg-neutral-200 dark:bg-neutral-950' >
                        <Typography className='text-black dark:text-white flex flex-row' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Todo App 
                            <a className='ml-2 text-sm text-[mediumspringgreen] hover:text-black dark:hover:text-white cursor-pointer'
                                href='https://blackdreamio.vercel.app'
                                target='_blank'>
                                BlackdreamIO 
                            </a>
                        </Typography>

                        <Button onClick={() => handleAuthDialog('logIn')} className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' variant='contained' size='small' style={{marginRight:'2%', display: showStack ? "none" : "block" | hasUser ? "none" : "block"}}>LOG IN</Button>
                        <Button 
                            onClick={() => handleAuthDialog('signUp')} 
                            className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' 
                            variant='contained' 
                            size='small' 
                            style={{marginRight:'2%', display: showStack ? "none" : "block" | hasUser ? "none" : "block"}}>
                                
                                SIGN UP
                        </Button>
                        <Button 
                            onClick={() => handleAuthState()} 
                            className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' 
                            variant='contained' 
                            size='small' 
                            style={{marginRight:'2%', display: showStack ? "none" : "block"}}>
                                
                                AUTH STATUS
                        </Button>
                        
                        <Button disableRipple sx={{color:"black"}} className='dark:text-neutral-400 dark:hover:text-white' style={{display : hasUser ? "block" : "none"}}>
                            <Tooltip title={localStorage.getItem("email")}>
                                <Person />
                            </Tooltip>
                        </Button>
                        <Button onClick={() => { LogOutUser(); handleUserLogIn() }} className='dark:text-white hover:dark:text-black dark:bg-neutral-900 hover:dark:bg-[aquamarine] bg-neutral-500' variant='contained' size='small' style={{marginRight:'2%', display: showStack ? "none" : "block" | hasUser ? "block" : "none"}}>LOG OUT</Button>
                        
                        <ThemeSwitch className={`${showStack} ? 'hidden' : 'visited:'`} defaultChecked={isDarkMode} onClick={() => handleThemeClick()} />
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
            <AuthPanel ref={childRef} onLoggedIn={() => handleUserLogIn()} />
        </nav>
    )
}

