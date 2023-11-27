import React, { useState, forwardRef, useImperativeHandle } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Authenticator, { AuthMode } from '../function/authenticator.ts';


const AuthPanel = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('logIn');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        }
    }));

    const LogInWithEmailAndPassword = (e) => {
        let status = Authenticator({
            event:e,
            email:email,
            password:password,
            auth_mode:AuthMode.LOG_IN
        }) 
    }

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
            </DialogContent>
            <DialogActions className='dark:bg-neutral-950 '>
                <Button onClick={() => HideDialog()} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>Cancel</Button>
                <Button onClick={(e) => LogInWithEmailAndPassword(e)} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>Log In</Button>
            </DialogActions>
        </Dialog>
    )
})

export default AuthPanel;