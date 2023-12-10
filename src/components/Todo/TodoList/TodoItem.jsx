import React from 'react';
import { Card, Typography, Stack, Box } from '@mui/material';

export const TodoItem = () => 
{
    return (
        <Box className='p-3 dark:bg-black dark:border-neutral-500 border-[1px] m-2' flexWrap={1}>
            <Stack>
                <Typography variant='h6' className='dark:text-white dark:text-base'>
                    MAKE A FULLSTACK TODO App
                </Typography>
            </Stack>
        </Box>
    )
}
