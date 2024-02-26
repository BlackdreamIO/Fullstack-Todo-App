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
        <div className='max-h-[4.9vh] dark:bg-neutral-900 p-2 w-screen flex flex-row items-center justify-end py-2 space-x-3'>
            <h1 className='dark:text-white flex flex-row items-center justify-center gap-2'> <MdAccessTime size={'1rem'}/> {currentTime}</h1>
            <h1 className='dark:text-white text-sm flex flex-row items-center justify-center gap-2'> <IoMdSync size={'1rem'}/> SYNCED : {'2'}</h1>
        </div>
    )
}