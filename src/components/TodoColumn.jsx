import React from 'react';
import { Link } from 'react-router-dom';

import { Stack, Typography, Badge } from '@mui/material';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const TodoColumn = ({Text='', completedTodoCount=0}) => {

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    const randomIndex = Math.floor(1 + Math.random() * Text.length); // when the database feature will be integrated then it will be fetched from the database id

    return (
        <Link to={`/todo/${randomIndex}`}>
            <Stack direction='row' className='items-center justify-center m-auto'>
                <HtmlTooltip title={Text} placement='left-end'>
                    <Badge badgeContent={completedTodoCount} className='dark:text-white w-11/12 p-1'>
                        <Typography variant='h1' className='hover:text-white dark:text-white hover:dark:text-black text-center dark:text-base !text-base font-mono hover:bg-black dark:bg-neutral-950 hover:dark:bg-[white] w-full h-[35px] p-1 border-neutral-700 dark:border-neutral-800 border-[1px] rounded-md cursor-pointer overflow-y-hidden'>
                            {Text} 
                    </Typography>
                    </Badge>
                </HtmlTooltip>
            </Stack>
        </Link>
    )
}
