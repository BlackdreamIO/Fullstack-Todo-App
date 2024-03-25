import { useState, useEffect, useRef, memo } from 'react'

import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Container } from '@/components/container/container';
import { Button } from '@/components/cva/button/cvaButton';

import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { CiCircleList, CiMenuBurger } from "react-icons/ci";

export const TodoItem = memo(({todoLayoutMode='grid', isFocused=false, isActive=true, onClick}) => {
    
    const [todoName, setTodoName] = useState('Untitled Todo Incognition task fetch fraction of a second some more text get overflow');
    const [todoState, setTodoState] = useState('incomplete');

    const todoItemRef = useRef(null);
    
    const handleClick = () => {
        if(onClick != null) {
            onClick();
        }
        handleTodoState();
    }
    const handleTodoState = () => {
        setTodoState(todoState == 'incomplete' ? 'pending' : 'incomplete')
    }

    const gridStyle = `bg-theme-bgSecondary w-[35%] max-w-[330px] min-h-[100px] px-2 py-2 rounded-xl transition-all duration-150
    ${isFocused ? 'border-2 border-theme-borderNavigation' : 'border-regulerBorder border-transparent hover:border-theme-borderPrimary'}`;
    
    const listStyle = `w-full min-h-[40px] p-2 rounded-xl transition-all duration-150
    ${isFocused ? 'border-2 border-theme-borderNavigation' : 'border-regulerBorder border-transparent hover:border-theme-borderPrimary '}
    ${isActive ? 'bg-neutral-700' : 'bg-theme-bgSecondary'}`;

    const currentStyle = todoLayoutMode =='grid' ? gridStyle : listStyle

    return (
        <MorphicElement onClick={() => handleClick()} className={currentStyle} ref={todoItemRef}>
            <Container flow='row' justifyItem='between'>
                <MorphicElement className='flex flex-row items-center justify-start space-x-2' element='ul'>
                    <Typography> 
                        { 
                            todoState == 'incomplete' ? <FaRegCircle/> 
                            : todoState == 'pending' ? <FaRegDotCircle/> 
                            : todoState == 'complete' ? <FaCircle/> : <FaRegCircle/> 
                        } 
                    </Typography>
                    <Typography>{todoName}</Typography>
                </MorphicElement>
                <Button tabIndex={isFocused ? 0 : -1} intent='transparent' size='xs' outline='off' fontWeight='bold' className='text-lg w-auto'>
                    <CiMenuBurger/>
                </Button>
            </Container>
        </MorphicElement>
    )
})

export default TodoItem;