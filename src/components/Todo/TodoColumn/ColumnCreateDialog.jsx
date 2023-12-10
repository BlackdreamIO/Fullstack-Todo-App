import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

export const ColumnCreateDialog = ({onClose, onCreate, open, onChange}) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [documentName, setDocumentName] = useState('');

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    const handleOnClose = () => {
        if(onClose != null){
            onClose();
        }
    }

    const handleOnCreate = () => { 
        if(onCreate != null) { 
            onCreate(); 
        }
    }

    const handleDocumentName = (e) => {
        const inputVal = e.target.value;
        setDocumentName(inputVal);
        onChange(inputVal);
    }
    const submitWithKeyboard = (e) => {
        if(e.key === 'Enter')
        {
           handleOnCreate();
        }
    }

    return (
        <Dialog className='backdrop:blur-md backdrop:bg-black' open={dialogOpen} onClose={() => handleOnClose()}>
            
            <DialogContent className='dark:bg-neutral-950 flex flex-col items-center justify-center '>
                <h1 className='dark:text-white text-4xl capitalize'>Create New Todo Column</h1>
                <Input 
                    onChange={(e) => handleDocumentName(e)}
                    onKeyDown={(e) => submitWithKeyboard(e)}
                    value={documentName}
                    placeholder='Document Name'
                    variant="filled"
                    className='dark:text-white dark:placeholder:text-white dark:bg-neutral-900 text-center dark:border-y-white mt-5 w-11/12 p-1 rounded-md mb-5'
                />
                <Typography className='dark:text-neutral-500 text-center capitalize font-sans'>
                    avoid using extra spaces after last word and avoid long name.
                </Typography>
                <Typography className='dark:text-yellow-500 text-center capitalize font-sans'>
                    dont create a document with the same name otherwise it might ovverite the original one 
                </Typography>
            </DialogContent>
            
            <DialogActions className='dark:bg-neutral-950 '>
                <Button onClick={() => handleOnClose()} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>Cancel</Button>
                <Button onClick={() => handleOnCreate()} className='dark:text-white dark:hover:text-black dark:hover:bg-white rounded-full'>Create  ( enter )</Button>
            </DialogActions>
       
        </Dialog>
    )
}