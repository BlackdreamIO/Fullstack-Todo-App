import React, { useEffect, useState } from 'react'
import { MdAccessTime } from "react-icons/md";
import { IoMdSync } from "react-icons/io";

export default function BottomNavigationStatus() 
{
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currTime = new Date().toLocaleTimeString();
            setCurrentTime(currTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); 

    return (
        <div className='h-[4.8vh] bg-theme-bgTertiary p-2 w-screen flex flex-row items-center justify-end py-2 space-x-3'>
            <h1 className='text-theme-textPrimary flex flex-row items-center justify-center gap-2'> <MdAccessTime size={'1rem'}/> {currentTime}</h1>
            <h1 className='text-theme-textPrimary text-sm flex flex-row items-center justify-center gap-2'> <IoMdSync size={'1rem'}/> SYNCED : {'2'}</h1>
        </div>
    )
}
