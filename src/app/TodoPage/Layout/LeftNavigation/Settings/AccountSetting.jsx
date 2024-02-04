import { useState } from 'react';

import { Input } from '@/components/input/input';
import { Button } from '@/components/cva/button/cvaButton';
import { Confirmation, ConfirmationHeader, ConfirmationFooter } from '@/components/confirmation/ConfirmationComponent';

export function AccountSetting() 
{
    const [username, setUsername] = useState('USERNAME_STR');
    const [openAccountDialog, setOpenAccountDialog] = useState(false);

    const accountDialogStyle = `dark:bg-[--darkPrimary] p-2 w-[50%] h-[150px] rounded-lg z-[2000]`

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
                        <h2 className='text-yellow-400 font-bold'>Dnager Zone</h2>
                        <div className='w-full bg-neutral-700 h-[1px]'></div>
                        <Button onClick={() => setOpenAccountDialog(true)} intent='error' className={'w-3/12'}>Delete This Account</Button>
                    </div>
                </main>
            </div>
            <Confirmation open={openAccountDialog} onClose={() => setOpenAccountDialog(false)}>
                <ConfirmationHeader className='mb-5'>
                    <h1 className='text-2xl font-mono mb-3'>Do You Want To Delete The Account</h1>
                    <p className='text-base font-mono text-neutral-500'>
                        if you delete your account then you will lose all of your progress from our server
                    </p>
                </ConfirmationHeader>
                <ConfirmationFooter/>
            </Confirmation>
        </section>
    )
}
