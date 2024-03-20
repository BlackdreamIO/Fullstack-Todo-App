import { useState, useEffect } from 'react';

import { Button } from '@/components/cva/button/cvaButton';
import { Input } from '@/components/input/input';

import GoogleIcon from '@/Assets/images/googleIcon.png'
import GithubIcon from '@/Assets/images/GithubIcon.webp'
import { Typography } from '@/components/typography/typohgraphy';


export default function AuthModal({mode='LogIn', onAuthComplete, onCloseRequest}) 
{
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authMethod, setAuthMethod] = useState('LogIn');

    useEffect(() => {
        setAuthMethod(mode);
    }, [mode])
    
    const handleLogIn = () => {
        alert(inputNotEmpty())
    }
    
    const handleSignUp = () => {
        alert(inputNotEmpty())
    }

    const handleSwitchAuthMode = () => {
        setAuthMethod(authMethod == 'LogIn' ? 'SignUp' : 'LogIn');
    }

    const handleAuthOperationComplete = () => {
        if(onAuthComplete != null) {
            onAuthComplete();
        }
    }

    const handleClose = () => {
        if(onCloseRequest != null) {
            onCloseRequest();
        }
    }

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const inputNotEmpty = () => {
        const empty = (value) => value.trim().length === 0;

        if (authMethod === 'SignUp') { return !(empty(email) || !isEmailValid(email) || empty(password) || empty(userName)); } 
        else if (authMethod === 'LogIn') { return !(empty(email) || !isEmailValid(email) || empty(password)); }

        return false;
    };

    return (
        <div className="dark-theme:bg-theme-secondary light-theme:bg-theme-primary w-[500px] min-h-auto h-auto m-auto p-3 rounded-md flex flex-col">
            <Typography variant={'h1'}>Log the heck</Typography>
            <Button>Log Test</Button>
            <button className='dark-theme:bg-white dark-theme:text-black p-4'>test alaka</button>
        </div>
    )
}

/*
  <div className="dark-theme:bg-theme-secondary light-theme:bg-theme-primary w-[500px] min-h-auto h-auto m-auto p-2 pt-2 pb-3 rounded-md flex flex-col
            items-center justify-center space-y-5 min-[1200px]:w-[600px] max-[550px]:w-[90vw] transition-transform duration-300">

            <div className="w-full">
                <Button 
                    intent='error'
                    className='w-[30px] float-right'
                    onClick={() => handleClose()}>
                        -
                </Button>
                <h1 className="dark-theme:text-white light-theme:text-black text-center uppercase text-2xl min-[1200px]:text-3xl">
                    {authMethod == 'LogIn' ? 'Log In' : 'Sign Up'}
                </h1>
            </div>

            <ul className="flex flex-row items-center justify-center gap-5 w-full dark-theme:bg-black p-2">
                <Button width={'large'} className='flex flex-row items-center justify-center gap-2 font-normal'>
                    <img src={GoogleIcon} className="w-[30px] h-[30px] rounded-[50%]" alt="google icon were not found" />
                    Google 
                </Button>
                <Button width={'large'} className='flex flex-row items-center justify-center gap-2 font-normal'>
                    <img src={GithubIcon} className="w-[30px] h-[30px] rounded-[50%]" alt="google icon were not found" />
                    GitHub 
                </Button>
            </ul>

            <div className="w-full flex flex-col items-center justify-center space-y-3">
                <Input
                    higlight={userName.length > 0}
                    placeHolder={'Enter UserName'} 
                    className="w-[90%] min-[1200px]:h-[60px]"
                    style={{display : authMethod == 'LogIn' ? 'none' : 'block'}} 
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                    higlight={isEmailValid(email)}
                    placeHolder={'Enter Email'} 
                    className="w-[90%] min-[1200px]:h-[60px]"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    higlight={password.length > 0}
                    placeHolder={'Enter Passowrd'} 
                    className="w-[90%] min-[1200px]:h-[60px]"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    className='w-[50%] min-[1200px]:h-[40px]' 
                    onClick={() => authMethod == 'LogIn' ? handleLogIn() : handleSignUp()}>
                        {authMethod == 'LogIn' ? 'Log In' : 'Sign Up'}
                </Button>
            </div>

            <div className="w-full space-y-3 flex flex-col items-center justify-center">
                <p className="dark-theme:text-white light-theme:text-black text-center uppercase text-sm min-[1200px]:text-base">OR</p>
                <Button 
                    className='w-auto font-normal dark-theme:text-neutral-500 light-theme:text-black dark-theme:hover:text-neutral-100
                    min-[1200px]:text-lg' 
                    intent='transparent'
                    outline='off'
                    onClick={() => handleSwitchAuthMode()}>
                        {authMethod == 'LogIn' ? 'Create New Account' : 'Already Have A Account !'}
                </Button>
            </div>
        </div>
*/