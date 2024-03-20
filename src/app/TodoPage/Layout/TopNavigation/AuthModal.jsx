import { useState, useEffect } from 'react';

import { Button } from '@/components/cva/button/cvaButton';
import { Input } from '@/components/cva/input/input';

import GoogleIcon from '@/Assets/images/googleIcon.png'
import GithubIcon from '@/Assets/images/GithubIcon.webp'
import { Container } from '@/components/container/container';
import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Wrapper } from '@/components/wrapper/wrapper';

export default function AuthModal({mode='LogIn', onAuthComplete, onCloseRequest}) 
{
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authMethod, setAuthMethod] = useState('LogIn');

    useEffect(() => {
        setAuthMethod(mode);
        setUserName('');
        setEmail('');
        setPassword('');
    }, [mode])
    
    const handleLogIn = () => {
        alert(inputNotEmpty())
    }
    
    const handleSignUp = () => {
        alert(inputNotEmpty())
    }

    const handleAuthOperationComplete = () => {
        if(onAuthComplete != null) {
            onAuthComplete();
        }
    }

    const handleSwitchAuthMode = () => setAuthMethod(authMethod == 'LogIn' ? 'SignUp' : 'LogIn');

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
        <Container flow='col' items='center' justify='center' className="bg-theme-bgSecondary w-[500px] m-auto p-3 rounded-md
            space-y-5 min-[1200px]:w-[600px] max-[550px]:w-[90vw] transition-transform duration-300">

            <MorphicElement className="w-full">
                <Button 
                    intent='error'
                    className='w-[25px] float-right'
                    onClick={() => handleClose()}>
                        -
                </Button>
                <Typography variant={'h1'} className="text-theme-textPrimary text-center font-normal uppercase min-[1200px]:text-3xl">
                    {authMethod == 'LogIn' ? 'Log In' : 'Sign Up'}
                </Typography>
            </MorphicElement>

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

            <Wrapper flow='col' className="w-full space-y-3">
                <Input
                    placeHolder={'Enter UserName'} 
                    className="w-[90%]"
                    style={{display : authMethod == 'LogIn' ? 'none' : 'block',
                    border : userName.length > 3 ? '1px solid lime' : ''} }
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                    style={{border : isEmailValid(email) ? '1px solid lime' : ''}}
                    placeHolder={'Enter Email'} 
                    className="w-[90%]"
                    varient='primary'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    style={{border : password.length > 6 ? '1px solid lime' : ''}}
                    placeHolder={'Enter Passowrd'} 
                    className="w-[90%]"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    className='w-[50%] min-[1200px]:h-[40px]' 
                    intent='secondary'
                    onClick={() => authMethod == 'LogIn' ? handleLogIn() : handleSignUp()}>
                        {authMethod == 'LogIn' ? 'Log In' : 'Sign Up'}
                </Button>
            </Wrapper>

            <Wrapper flow='col' className="w-full space-y-3">
                <p className="text-theme-textPrimary text-center uppercase text-sm min-[1200px]:text-base">OR</p>
                <Button 
                    className='w-auto font-normal p-0 text-theme-textTertiary min-[1200px]:text-lg' 
                    intent='transparent'
                    outline='off'
                    onClick={() => handleSwitchAuthMode()}>
                        {authMethod == 'LogIn' ? 'Create New Account' : 'Already Have A Account !'}
                </Button>
            </Wrapper>
        </Container>
    )
}