import React from 'react'

export default function BottomNavigationStatus() 
{
    return (
        <div className='h-[5vh] dark:bg-neutral-900 p-2 w-screen flex flex-row items-end justify-end'>
            <h1 className='dark:text-white'>{Date.now()}</h1>
        </div>
    )
}
