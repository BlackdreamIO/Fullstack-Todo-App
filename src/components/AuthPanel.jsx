import React from 'react';
import { Input } from './Input';
import { Button } from './Button';

export default function AuthPanel() 
{
    return (
        <div className='dark:bg-neutral-950 p-2 m-auto mt-5 max-w-[950px] w-5/12 rounded-lg border-[1px] dark:border-neutral-700
                        '>
            <h1 className='dark:text-white text-2xl font-mono text-center'>AUTH PANEL</h1>
            <br />
            <form>
                <div className='w-full flex flex-col items-center justify-center mb-5'>
                    <Input style={{width:"60%"}} placeholder='Email' type='email' />
                    <Input style={{width:"60%"}} placeholder='Password' type='password' />
                    <ul className='w-full flex flex-row items-center justify-center'>
                        <Button useTransition text={"Create"} onClick={() => alert()} />
                        <Button useTransition text={"Log In"} onClick={() => alert()} />
                    </ul>
                </div>

                <p className='dark:text-neutral-500 text-center'>OR</p>

                <div className='w-full flex flex-row items-center justify-center mt-5'>
                    <div className='w-[50px] border-2 dark:border-transparent dark:hover:border-white p-2 rounded-full cursor-pointer'>
                        <img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="prG not found" />
                    </div>
                </div>

                <p className='dark:text-yellow-500 text-center capitalize mt-2'>
                    if you use this without any account you will not be able to save any of your data
                </p>

                 <div className='w-full mt-5 mb-5 flex flex-col items-center justify-center'>
                    <Button useTransition text={"Continue To App"} onClick={() => alert()} />
                </div>

            </form>
        </div>
    )
}
