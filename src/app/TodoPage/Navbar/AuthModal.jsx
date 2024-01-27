import { useState, useEffect } from 'react';

import { Button, buttonVarient } from '../../../components/button/button';
import { Input } from '../../../components/input/input';

import GoogleIcon from '../../../Assets/images/googleIcon.png'
import GithubIcon from '../../../Assets/images/GithubIcon.webp'


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
        <div className="dark:bg-[--darkPrimary] bg-neutral-100 w-[500px] min-h-auto h-auto m-auto p-2 pt-2 pb-3 rounded-md flex flex-col
            items-center justify-center space-y-5 min-[1200px]:w-[600px] max-[550px]:w-[90vw] transition-transform duration-300">

            <div className="w-full">
                <Button 
                    className='!bg-red-600 !hover:bg-red-700 w-[20px] h-[20px] float-right text-xl p-0 m-auto text-center'
                    varient={buttonVarient.primary}
                    onClick={() => handleClose()}>
                        -
                </Button>
                <h1 className="dark:text-white text-center uppercase text-2xl min-[1200px]:text-3xl">
                    {authMethod == 'LogIn' ? 'Log In' : 'Sign Up'}
                </h1>
            </div>

            <ul className="flex flex-row items-center justify-center gap-5 w-full dark:bg-black p-2">
                <Button className='w-[250px] flex flex-row items-center justify-center gap-2 font-normal' varient={buttonVarient.primary}>
                    <img src={GoogleIcon} className="w-[30px] h-[30px] rounded-[50%]" alt="google icon were not found" />
                    Google 
                </Button>
                <Button className='w-[250px] flex flex-row items-center justify-center gap-2 font-normal' varient={buttonVarient.primary}>
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
                    varient={buttonVarient.primary}
                    onClick={() => authMethod == 'LogIn' ? handleLogIn() : handleSignUp()}>
                        {authMethod == 'LogIn' ? 'Log In' : 'Sign Up'}
                </Button>
            </div>

            <div className="w-full space-y-5 flex flex-col items-center justify-center">
                <p className="dark:text-white text-center uppercase text-sm min-[1200px]:text-md">OR</p>
                <Button 
                    className='w-auto font-normal dark:text-neutral-500 dark:hover:text-neutral-100
                    min-[1200px]:text-lg' 
                    varient={buttonVarient.ghost}
                    onClick={() => handleSwitchAuthMode()}>
                        {authMethod == 'LogIn' ? 'Create New Account' : 'Already Have A Account !'}
                </Button>
            </div>
        </div>
    )
}