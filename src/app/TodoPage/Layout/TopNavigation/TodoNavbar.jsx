import React, { useState, useEffect, Fragment } from 'react';

import { useCurrentAuthState, useThemeManager, useWindowResize } from '../../../../hooks/hooksExporter';

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

    const handleThemeClick = () => setDarkMode((prev) => prev =! prev);

    return (
        <Wrapper justifyItem='between' className='w-full h-[8vh] bg-theme-bgSecondary gap-2 px-2 py-1'>
            <NavbarLeftArea />
            <NavbarRightArea/>
        </Wrapper>
    )
}
