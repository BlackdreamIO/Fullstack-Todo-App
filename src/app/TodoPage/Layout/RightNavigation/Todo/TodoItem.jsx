import { useState, useEffect, useRef, memo, Fragment } from 'react'

import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Container } from '@/components/container/container';
import { Button } from '@/components/cva/button/cvaButton';
import { Wrapper } from '@/components/wrapper/wrapper';

import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { CiCircleList, CiMenuBurger } from "react-icons/ci";

import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";
import { DropDownContent, DropDownHeader, DropDownMenu, getCalculatedPosition } from '@/components/dropDown/DropDown';
import { useInsideClick } from '@/hooks/useInsideClick';

function TodoContextContent({onEditName, onEditState, onChangePriority, onRemoveTodo}) 
{
    return (
        <Wrapper flow='col' wrap='no-wrap' className='w-full' onClick={e => e.stopPropagation()}>
            <Button size='normal' width='full' intent='secondary' onClick={onEditName}>Edit Name</Button>
            <Button size='normal' width='full' intent='secondary' onClick={onEditState}>Edit State</Button>
            <Button size='normal' width='full' intent='secondary' onClick={onChangePriority}>Change Priority</Button>
            <Button size='normal' width='full' intent='error' onClick={onRemoveTodo}>Remove Todo</Button>
        </Wrapper>
    )
}

export const TodoItem = memo(({todoLayoutMode='grid', isFocused=false, isActive=true, onClick}) => {
    
    const [todoName, setTodoName] = useState('Untitled Todo Incognition task fetch fraction of a second some more text get overflow');
    const [todoState, setTodoState] = useState('incomplete');

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [openDropdownContent, setOpenDropdownContent] = useState(false);

    const todoItemRef = useRef(null);
    const dropdownAnchorRef = useRef(null);
    const [wasInsideClick] = useInsideClick(todoItemRef);
    
    useEffect(() => {
      if(!wasInsideClick) {
        setOpenDropdownContent(false);
      }
    }, [wasInsideClick])
    

    const handleClick = () => {
         console.log('clicked'); 
        handleTodoState();
        if(onClick != null) {
            onClick();
        }
    }

    const handleTodoState = () => {
        setTodoState(todoState == 'incomplete' ? 'complete' : 'incomplete')
    }

    const handleDropdownOpen = (e) => {
        e.stopPropagation();
        const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();
        setPosition({ x: getCalculatedPosition(anchorRect.left, 50, 20), y: getCalculatedPosition(e.clientY)});
        setOpenDropdownContent(!openDropdownContent);
    }

    const handleTodoClick = (mode='editName') => {
        switch (mode) {
            case 'editName':
                
                break;
            case 'editState':
                
                break;
            case 'changePriority':
                
                break;
            case 'removeTodo':
                
                break;
        }
    }

    const gridStyle = `bg-theme-bgSecondary w-full max-w-[330px] min-h-[100px] px-2 py-2 rounded-xl transition-all duration-150
    ${isFocused ? 'border-4 border-theme-borderNavigation' : 'border-regulerBorder border-transparent hover:border-theme-borderPrimary'}
    ${isActive && isFocused ? 'border-theme-borderPrimary' : ''}`;
    
    const listStyle = `w-full min-h-[40px] p-2 rounded-xl transition-all duration-150
    ${isFocused ? 'border-4 border-theme-borderNavigation' : 'border-regulerBorder border-transparent hover:border-theme-borderPrimary '}
    ${isActive && isFocused ? 'bg-theme-bgTertiary' : 'bg-theme-bgSecondary'}`;

    const currentStyle = todoLayoutMode =='grid' ? gridStyle : listStyle;
    const layoutBasedOffsetForDropdow = todoLayoutMode =='grid' ? 150 : 0;

    return (
        <ContextMenu className={`${todoLayoutMode == 'grid' ? 'w-[35%] max-w-[330px] min-h-[100px]' : 'w-full min-h-[40px]'}`} contextContentSize={{x:250, y : 200}} onDoubleClick={() => handleClick()}>
            <ContextMenuHeader className={currentStyle} ref={todoItemRef}>
                <MorphicElement>
                    <Container flow='row' justifyItem='between z-0'>
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
                        <DropDownMenu isOpen={openDropdownContent} onClose={()=>setOpenDropdownContent(false)}>
                            <DropDownHeader ref={dropdownAnchorRef} onClick={(e)=>handleDropdownOpen(e)}>
                                <CiMenuBurger 
                                    size='1.2rem'
                                    className='text-theme-textTertiary hover:text-theme-textPrimary cursor-pointer'
                                />
                            </DropDownHeader>
                            <Wrapper style={{top : `${position.y}px`, left : `${position.x + layoutBasedOffsetForDropdow}px`}} className='fixed w-full pointer-events-none flex-col flex-nowrap items-start justify-start z-10' >
                                <DropDownContent className='relative w-[250px] right-56' open={openDropdownContent}>
                                    <TodoContextContent
                                        onEditName={handleTodoClick('editName')}
                                        onEditState={handleTodoClick('editState')}
                                        onChangePriority={handleTodoClick('editPriority')}
                                        onRemoveTodo={handleTodoClick('removeTodo')}
                                    />
                                </DropDownContent>
                            </Wrapper>
                        </DropDownMenu>
                    </Container>
                </MorphicElement>
            </ContextMenuHeader>

            <ContextMenuContent className='w-[250px] border-theme-borderSecondary'>
                <TodoContextContent/>
            </ContextMenuContent>
        </ContextMenu>
    )
})

export default TodoItem;