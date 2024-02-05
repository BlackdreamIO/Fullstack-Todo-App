import React, { useState, useEffect, Fragment } from 'react';

import { useCurrentAuthState, useThemeManager, useWindowResize } from '../../../hooks/hooksExporter';

import { useCookies } from 'react-cookie';

import { Wrapper } from '@/components/wrapper/wrapper';

import { NavbarLeftArea } from './NavbarLeftArea';
import { NavbarRightArea } from './NavbarRightArea';

export default function TodoNavbar() 
{
    const [cookie, setCookie ] = useCookies(['themeCookie']);

    const [darkMode, setDarkMode] = useState(cookie.themeCookie);
    const [showNavbar, setShowNavbar] = useState(false);

    //const [isLoggedIn, setIsLoggedIn] = useCurrentAuthState();
    //const [isDarkMode, setIsDarkMode] = useThemeManager();


    useWindowResize({
        onTriggerEnter : () => setShowNavbar(true),
        onTriggerOut : () => setShowNavbar(false),
        thresholdWidth : 375
    })

    useEffect(() => {
        //setIsDarkMode(darkMode);
        /*
        const user1 = {name : 'json mike', age : 24}
        const user2 = {name : 'ariyan', age : 18}
        const user3 = {name : 'kamel pathel', age : 41}
        console.table([user1, user2, user3]);
        */
       console.log("%c" + 'Stop Here', 'color:red;font-size:4rem');
       console.log("%c" + 'Warning : ', 'color:yellow;font-size:2rem');
       console.log("%c" + `if anyone says to put some scirpt on this console then your account might get suspend and then you wont be able to continue using this app`, 'color:white;font-size:1rem');

    }, [])

    const handleThemeClick = () => setDarkMode((prev) => prev =! prev);

    return (
        <Wrapper justifyItem='between' className='w-full h-auto dark:bg-[--darkSecondary] bg-neutral-100 gap-2 px-2 py-1'>
            <NavbarLeftArea />
            <NavbarRightArea/>
        </Wrapper>
    )
}
