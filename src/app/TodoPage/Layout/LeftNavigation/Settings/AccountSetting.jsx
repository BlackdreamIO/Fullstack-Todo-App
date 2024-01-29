import { useState } from 'react';

import { Input } from '../../../../../components/input/input';
import { Button, buttonVarient } from '../../../../../components/button/button';

export function AccountSetting() 
{
    const [username, setUsername] = useState('USERNAME_STR');

    return (
        <section className='w-full h-auto mt-5'>
            <h1 className='dark:text-neutral-200 font-bold text-3xl'>Account Setting</h1>
            <div className='w-full mt-5 flex flex-col space-y-10'>
                <div className='flex flex-row items-center justify-start gap-2'>
                    <img
                        className='w-[80px]' 
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" 
                        alt="not found"
                    />
                    <h2>{username}</h2>
                </div>
                <main className='flex flex-col gap-5'>
                    <div className='flex flex-row items-center gap-3 w-full'>
                        <Input className='shadow-none w-6/12' value={username} placeholder={'Enter Username'} />
                        <Button className={'w-3/12'}>Change Username</Button>
                    </div>
                    <div className='flex flex-row items-center gap-3 w-full'>
                        <Input className='shadow-none w-6/12' value={username} placeholder={'Enter Username'} />
                        <Button className={'w-3/12'}>Change Email</Button>
                    </div>
                    <div className='flex flex-row items-center gap-3 w-full'>
                        <Input className='shadow-none w-6/12' value={username} placeholder={'Enter Username'} />
                        <Button className={'w-3/12'}>Change Password</Button>
                    </div>
                    <div className='flex flex-col gap-3 mt-5 w-full'>
                        <h2>Dnager Zone</h2>
                        <Button varient={buttonVarient.error} className={'w-3/12'}>Delete This Account</Button>
                    </div>
                </main>
            </div>
        </section>
    )
}
