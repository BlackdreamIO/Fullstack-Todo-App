import { useState, useEffect, useRef } from 'react'

import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Container } from '@/components/container/container';
import { Button } from '@/components/cva/button/cvaButton';

import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { CiCircleList, CiMenuBurger } from "react-icons/ci";

export default function TodoItem({todoLayoutMode='grid'}) 
{
    const [todoName, setTodoName] = useState('Untitled Todo Incognition task fetch fraction of a second some more text get overflow');
    const [todoState, setTodoState] = useState('incomplete');
    const [isFocused, setIsFocused] = useState(false);

    const handleTodoState = () => {
        setTodoState(todoState == 'incomplete' ? 'pending' : 'incomplete')
    }

    const gridStyle = `bg-theme-bgSecondary w-[35%] max-w-[330px] min-h-[100px] px-2 py-2 rounded-xl transition-all duration-150
    border-regulerBorder border-transparent hover:border-theme-borderPrimary 
    focus-visible:border-4 focus-visible:border-theme-borderNavigation outline-none select-none`;
    
    const listStyle = `w-full bg-theme-bgSecondary min-h-[40px] p-2 rounded-xl transition-all duration-150
        border-regulerBorder border-transparent hover:border-theme-borderPrimary
        focus-visible:border-4 focus-visible:border-theme-borderNavigation outline-none select-none`;

    const currentStyle = todoLayoutMode =='grid' ? gridStyle : listStyle

    const ListLayout = () => {
        return (
            <Container flow='row' justifyItem='between'>
                <MorphicElement className='flex flex-row items-center justify-start space-x-2' element='ul'>
                    <Typography tabIndex={0}> 
                        { 
                            todoState == 'incomplete' ? <FaRegCircle/> 
                            : todoState == 'pending' ? <FaRegDotCircle/> 
                            : todoState == 'complete' ? <FaCircle/> : <FaRegCircle/> 
                        } 
                    </Typography>
                    <Typography>{todoName}</Typography>
                </MorphicElement>
                <Button intent='transparent' size='xs' outline='off' fontWeight='bold' className='text-lg w-auto'>
                    <CiMenuBurger/>
                </Button>
            </Container>
        )
    }

    return (
        <MorphicElement tabIndex={0} onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} onClick={() => handleTodoState()} className={currentStyle}>
            <Container flow='row' justifyItem='between'>
                <MorphicElement className='flex flex-row items-center justify-start space-x-2' element='ul'>
                    <Typography tabIndex={0}> 
                        { 
                            todoState == 'incomplete' ? <FaRegCircle/> 
                            : todoState == 'pending' ? <FaRegDotCircle/> 
                            : todoState == 'complete' ? <FaCircle/> : <FaRegCircle/> 
                        } 
                    </Typography>
                    <Typography>{todoName}</Typography>
                </MorphicElement>
                <Button intent='transparent' size='xs' outline='off' fontWeight='bold' className='text-lg w-auto'>
                    <CiMenuBurger/>
                </Button>
            </Container>
        </MorphicElement>
    )
}
