import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';

export default function AuthPanel() 
{
    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        console.log(email);
        console.log(password);
    }, [email])
    

    return (
      <Dialog className='backdrop:blur-md backdrop:bg-black' open={open} onClose={handleClose}>
        <DialogTitle className='dark:bg-neutral-950 dark:text-white'>Log In</DialogTitle>
        <DialogContent className='dark:bg-neutral-950'>
            <TextField  autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth 
                        variant="filled" className='dark:bg-[#e3f2fd] dark:text-[aquamarine] dark:placeholder:text-yellow-400' 
                        sx={{borderRadius:'10px'}} onChange={(e) => setEmail(e.target.value)} required
            />
             <TextField  autoFocus margin="dense" id="name" label="Password" type="password" fullWidth 
                        variant="filled" className='dark:bg-[#e3f2fd] dark:text-[aquamarine] dark:placeholder:text-yellow-400' 
                        sx={{borderRadius:'10px'}} onChange={(e) => setPassword(e.target.value)} required
            />
        </DialogContent>
        <DialogActions className='dark:bg-neutral-950 '>
            <Button onClick={handleClose} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>Cancel</Button>
            <Button onClick={handleClose} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>Log In</Button>
        </DialogActions>
      </Dialog>
    )
}
