import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import Authenticator, { AuthMode, SignInWithGoogle, IsLoggedIn, AutoSignIn } from '../function/authenticator';
import { Container, Typography } from '@mui/material';

const AuthPanel = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('logIn');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const socialAuth = {
        google : "https://cdn-icons-png.flaticon.com/512/2702/2702602.png",
        github : "https://cdn-icons-png.flaticon.com/512/25/25231.png"
    }

    const HideDialog = () => {
       setShow(false);
    }

    useImperativeHandle(ref, () => ({
        ShowLogIn() 
        {
            setShow(true);
            setMode('logIn');
        },
        ShowSignUp() 
        {
            setShow(true);
            setMode('signUp');
        },
        HideAuthDialog()
        {
            setShow(false);
        }
    }));

    const HandleAuthentication = async (e) => {
        await Authenticator({
            event: e,
            email: email,
            password: password,
            auth_mode : mode === 'logIn' ? AuthMode.LOG_IN : AuthMode.SIGN_UP
        })
        .then((response) => { response.uid ? handleLogIn() : console.log("No User Found"); })
        .catch((error) => console.log("ERR : ", error));
    }

    const handleLogIn = () => {
        if(props.onLoggedIn != null) 
        {
            props.onLoggedIn();
            localStorage.setItem("user", IsLoggedIn());
            return;
        }
        alert("Failed To Detect User");
    }

    useEffect(() => {
        //AutoSignIn();
    }, [])
    

    return (
        <Dialog className='backdrop:blur-md backdrop:bg-black' open={show} onClose={HideDialog}>
            <DialogTitle className='dark:bg-neutral-950 dark:text-white'>
                {mode === 'logIn' ? 'Log In' : 'Sign Up'}
            </DialogTitle>

            <DialogContent className='dark:bg-neutral-950'>
                <TextField  autoFocus margin="dense" label="Email Address" type="email" fullWidth 
                            variant="filled" className='dark:bg-[#e3f2fd] dark:text-[aquamarine] dark:placeholder:text-yellow-400' 
                            sx={{borderRadius:'10px'}} onChange={(e) => setEmail(e.target.value)} required
                />
                 <TextField  autoFocus margin="dense" label="Password" type="password" fullWidth 
                            variant="filled" className='dark:bg-[#e3f2fd] dark:text-[aquamarine] dark:placeholder:text-yellow-400' 
                            sx={{borderRadius:'10px'}} onChange={(e) => setPassword(e.target.value)} required
                />

                <Typography marginTop='2%' align='center' color='white'> Or </Typography>
                
                <ul className='flex flex-row items-center justify-center m-auto'>
                    <img onClick={() => { SignInWithGoogle(); handleLogIn(); }} src={socialAuth.google} alt="the google icon is not found" className='w-[35px] ml-5 mr-5 bg-neutral-300 dark:bg-white dark:hover:bg-neutral-400 p-2 rounded-full cursor-pointer' />
                    <img src={socialAuth.github} alt="the google icon is not found" className='w-[35px] ml-5 mr-5 bg-neutral-300 dark:bg-white dark:hover:bg-neutral-400 p-2 rounded-full cursor-pointer' />
                </ul>
            </DialogContent>

            <DialogActions className='dark:bg-neutral-950 '>
                <Button onClick={() => HideDialog()} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>Cancel</Button>
                <Button onClick={(e) => HandleAuthentication(e)} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>
                    { mode === 'logIn' ? 'Log In' : 'Sign Up'}
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default AuthPanel;