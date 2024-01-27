import React, { useState, useEffect } from 'react';

import { useCurrentAuthState, useThemeManager, useWindowResize } from '../../../hooks/hooksExporter';

import { useCookies } from 'react-cookie';
import { DropDownMenu, DropDownContent, DropDownHeader  } from '../../../components/dropDown/DropDown';
import { Button, buttonVarient } from '../../../components/button/button';

import dummyImage from '../../../Assets/images/dummyImage.webp';
import loggedInUser from '../../../Assets/images/loggedInUser.webp';

import { Dialog, DialogContent  } from '../../../components/dialog/DialogComponent';
import AuthMoadal from './AuthModal';


export default function TodoNavbar() 
{
    const [cookie, setCookie ] = useCookies(['themeCookie']);

    const [darkMode, setDarkMode] = useState(cookie.themeCookie);
    const [showNavbar, setShowNavbar] = useState(false);

    //const [isLoggedIn, setIsLoggedIn] = useCurrentAuthState();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    //const [isDarkMode, setIsDarkMode] = useThemeManager();

    const [openDropDown, setOpenDropDown] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState(false);

    useWindowResize({
        onTriggerEnter : () => setShowNavbar(true),
        onTriggerOut : () => setShowNavbar(false),
        thresholdWidth : 375
    })

    //useEffect(() => {
        //setIsDarkMode(darkMode);
    //}, [darkMode])

    const handleThemeClick = () => setDarkMode((prev) => prev =! prev);

    return (
        <nav className='flex flex-row items-center justify-between w-full h-auto dark:bg-[--darkPrimary] 
            bg-neutral-100 gap-2 p-2 shadow-lg dark:shadow-white'>
            <h1 className='dark:text-white text-neutral-700 font-robotoMedium text-xl mb-1 uppercase'>Task Flow</h1>            
            
            <DropDownMenu onClose={() => setOpenDropDown(false)} isOpen={openDropDown}>
                
                <DropDownHeader>
                    {
                        isLoggedIn ? (
                            <section className='group flex flex-row items-center justify-center dark:bg-black dark:hover:border-neutral-800 border-black 
                                border-[1px] space-x-3 box-border mr-3 pl-2 pr-2 rounded-lg max-w-auto overflow-hidden whitespace-wrap cursor-pointer'
                                onClick={() => setOpenDropDown(!openDropDown)}>
                                <img 
                                    className='w-[35px] h-[35px] p-2 dark:bg-black rounded-[50%]'
                                    src={loggedInUser} 
                                    alt="profile not found"
                                />
                                <h2 className='dark:text-neutral-500 text-center font-bold dark:group-hover:text-neutral-200 leading-tight'>Moamal Ala</h2>
                            </section>
                        )
                        : (
                            <section className='mr-3 pl-2 pr-2 max-h-auto overflow-hidden cursor-pointer'
                                onClick={() => setOpenDropDown(!openDropDown)}>
                                <img 
                                    className='w-[35px] p-2 rounded-[50%] border-[1px] border-black'
                                    src={dummyImage}
                                    alt="img not found"
                                />
                            </section>
                        )
                    }
                </DropDownHeader>

                <DropDownContent className={`${isLoggedIn ? 'w-[100%]' : 'w-[205%]'}`} open={openDropDown}>
                    {
                        isLoggedIn ? (
                            <>
                                <Button varient={buttonVarient.secondary} onClick={() => alert("clicked")} >
                                    Account Setting
                                </Button>
                                <Button varient={buttonVarient.primary} onClick={() => alert("clicked")} >
                                    Log Out
                                </Button>
                            </>
                        )
                        : 
                        (
                            <>
                                <Button varient={buttonVarient.primary} onClick={() => alert("not logged in create")} >
                                    Create Account
                                </Button>
                                <Button varient={buttonVarient.primary} onClick={() => setOpenAuthDialog(true)}>
                                    Log In
                                </Button>
                            </>
                        )
                    }
                </DropDownContent>

                <Dialog open={openAuthDialog}>
                    <DialogContent isOpen={openAuthDialog} onClose={() => setOpenAuthDialog(false)}>
                        <AuthMoadal mode='SignUp' onCloseRequest={() => setOpenAuthDialog(false)}/>
                    </DialogContent>
                </Dialog>

            </DropDownMenu>
        </nav>
    )
}
