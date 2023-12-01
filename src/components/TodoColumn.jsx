import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

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

    return (
        <Stack direction='row' className='items-center justify-center m-auto'>
            <HtmlTooltip title={Text} placement='left-end'>
                <Badge badgeContent={completedTodoCount} className='dark:text-white w-11/12 p-1'>
                    <Typography className='dark:text-white hover:dark:text-black text-center text-2xl font-mono dark:bg-neutral-950 hover:dark:bg-[white] w-full h-[35px] p-1 dark:border-neutral-700 border-[1px] rounded-md cursor-pointer overflow-y-hidden'>
                        {Text} 
                 </Typography>
                </Badge>
            </HtmlTooltip>
        </Stack>
    )
}
