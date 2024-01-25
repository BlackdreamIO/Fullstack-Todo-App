import React, { useState, useEffect, useRef } from 'react';

import { useCurrentAuthState, useThemeManager, useWindowResize } from '../hooks/hooksExporter';

import { useCookies } from 'react-cookie';
import { DropDownMenu, DropDownContent, DropDownHeader  } from './dropDown/DropDown';
import { Button, buttonVarient } from './button/button';

export default function Navbar () 
{
    const [cookie, setCookie ] = useCookies(['themeCookie']);

    const [darkMode, setDarkMode] = useState(cookie.themeCookie);
    const [showNavbar, setShowNavbar] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useCurrentAuthState();
    const [isDarkMode, setIsDarkMode] = useThemeManager();

    const [openDropDown, setOpenDropDown] = useState(false);

    useWindowResize({
        onTriggerEnter : () => setShowNavbar(true),
        onTriggerOut : () => setShowNavbar(false),
        thresholdWidth : 375
    })

    useEffect(() => {
        setIsDarkMode(darkMode);
    }, [darkMode])

    const handleThemeClick = () => setDarkMode((prev) => prev =! prev);

    return (
        <nav className='flex flex-row items-center justify-between w-full h-auto dark:bg-[--primaryBG] gap-2 p-2'>
            <h1 className='dark:text-white font-robotoMedium text-xl mb-1 uppercase'>Task Flow</h1>            
            
            <DropDownMenu onClose={() => setOpenDropDown(false)} isOpen={openDropDown}>
                
                <DropDownHeader onClick={() => setOpenDropDown(!openDropDown)}>
                    <section className='group flex flex-row items-center justify-center dark:bg-black dark:hover:border-neutral-800 border-black 
                        border-[1px] space-x-3 box-border mr-3 pl-2 pr-2 rounded-lg max-w-[300px] max-h-[35px] overflow-hidden whitespace-wrap cursor-pointer'>
                        <img 
                            className='w-[40px] p-2 dark:bg-black rounded-[50%]'
                            src="https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png" 
                            alt="profile not found"
                        />
                        <h2 className='dark:text-neutral-500 text-center font-bold dark:group-hover:text-neutral-200 leading-tight'>Moamal Ala</h2>
                    </section>
                </DropDownHeader>

                <DropDownContent open={openDropDown}>
                    <Button varient={buttonVarient.primary} onClick={() => alert("clicked")} >
                        Primary
                    </Button>
                    <Button varient={buttonVarient.secondary} onClick={() => alert("clicked")} >
                        Secondary
                    </Button>
                    <Button varient={buttonVarient.error} onClick={() => alert("clicked")} >
                        Error
                    </Button>
                    <Button varient={buttonVarient.sucess} onClick={() => alert("clicked")} >
                        Sucess
                    </Button>
                     <Button varient={buttonVarient.ghost} onClick={() => alert("clicked")} >
                        Ghost
                    </Button>
                    <Button varient={buttonVarient.outlined} onClick={() => alert("clicked")} >
                        Outlined
                    </Button>
                </DropDownContent>

            </DropDownMenu>
        </nav>
    )
}
