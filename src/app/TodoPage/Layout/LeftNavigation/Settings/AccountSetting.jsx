import { useState } from 'react';

import { Input } from '../../../../../components/input/input';
import { Button, buttonVarient } from '../../../../../components/button/button';
import { Dialog, DialogHeader, DialogContent } from '../../../../../components/dialog/DialogComponent';

export function AccountSetting() 
{
    const [username, setUsername] = useState('USERNAME_STR');
    const [openAccountDialog, setOpenAccountDialog] = useState(true);

    const accountDialogStyle = `dark:bg-black p-2 w-[500px] h-auto`

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
                        <Button onClick={() => setOpenAccountDialog(true)} varient={buttonVarient.error} className={'w-3/12'}>Delete This Account</Button>
                    </div>
                </main>
            </div>
            <Dialog open={openAccountDialog}>
                <DialogHeader>
                    <h1>ACCOUNT DELETION AREA</h1>
                </DialogHeader>
                <DialogContent className={accountDialogStyle} isOpen={openAccountDialog} onClose={() => setOpenAccountDialog(false)}>
                    <Button onClick={(e) => e.stopPropagation()} varient={buttonVarient.error} className={'w-3/12'}>Delete This Account</Button>
                </DialogContent>
            </Dialog>
        </section>
    )
}
