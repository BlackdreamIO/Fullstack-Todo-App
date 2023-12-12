import { Box, TextField  } from '@mui/material';

export const CreateTodo = () => {
    
    return (
        <Box className='w-full dark:bg-neutral-800'>
            <TextField  
                disableUnderline 
                placeholder='Text'
                className='dark:text-white  w-11/12 h-[40px] bg-black m-1'
                style={{textAlign:'center'}}
            />
        </Box>
    )
}