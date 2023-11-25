import React from 'react';
import { Input } from './Input';

import { Button } from '@mui/material';

export default function AuthPanel() 
{
    return (
        <div className='dark:bg-neutral-950 p-2 m-auto mt-5 max-w-[950px] w-5/12 rounded-lg border-[1px] dark:border-neutral-700'>
             <div className='w-full mt-5 mb-5 flex flex-col items-center justify-center'>
                <Button variant='contained'>TEXT</Button>
            </div>
        </div>
    )
}
