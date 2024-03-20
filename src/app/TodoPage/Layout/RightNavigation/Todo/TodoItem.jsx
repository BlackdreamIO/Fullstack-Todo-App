import { useState, useEffect, useRef } from 'react'

import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Container } from 'postcss';
import { Button } from '@/components/cva/button/cvaButton';

export default function TodoItem({todoLayoutMode='grid'}) 
{

    const gridStyle = `bg-theme-bgSecondary w-[200px] h-[100px] px-2 py-2 rounded-xl transition-all duration-150
    border-regulerBorder border-transparent hover:border-theme-borderPrimary`;
    
    const listStyle = `bg-theme-bgSecondary w-full min-h-[40px] px-2 py-2 rounded-xl transition-all duration-150
    border-regulerBorder border-transparent hover:border-theme-borderPrimary`;

    const currentStyle = todoLayoutMode =='grid' ? gridStyle : listStyle

    const GridLayout = () => {
        return (
            <Container flow='col' jusitfy='start'>
                <Typography>'Untitled Todo'</Typography>
            </Container>
        )
    }

    return (
        <MorphicElement className={currentStyle}>
            <GridLayout/>
        </MorphicElement>
    )
}
