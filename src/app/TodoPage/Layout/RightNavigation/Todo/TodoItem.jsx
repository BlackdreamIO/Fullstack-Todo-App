import { useState, useEffect, useRef, memo, Fragment } from 'react';
import { TaskContextProvider, useTaskContext } from '@/contextAPI/TaskContextAPI';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useInsideClick } from '@/hooks/useInsideClick';

import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";
import { DropDownContent, DropDownHeader, DropDownMenu, getCalculatedPosition } from '@/components/dropDown/DropDown';
import { Dialog, DialogContent } from '@/components/dialog/DialogComponent';

import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Container } from '@/components/container/container';
import { Button } from '@/components/cva/button/cvaButton';
import { Wrapper } from '@/components/wrapper/wrapper';
import { Input } from '@/components/cva/input/input';

import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { CiCircleList, CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import TodoEditDialog from './TodoEditDialog';


function TodoContextContent({onEditName, onEditState, onChangePriority, onRemoveTodo}) 
{
    return (
        <Wrapper flow='col' wrap='no-wrap' className='w-full' onClick={e => e.stopPropagation()}>
            <Button tabIndex={5} size='normal' width='full' intent='secondary' onClick={onEditName}>Edit Name</Button>
            <Button tabIndex={5} size='normal' width='full' intent='secondary' onClick={onEditState}>Edit State</Button>
            <Button tabIndex={5} size='normal' width='full' intent='secondary' onClick={onChangePriority}>Change Priority</Button>
            <Button tabIndex={5} size='normal' width='full' intent='error' onClick={onRemoveTodo}>Remove Todo</Button>
        </Wrapper>
    )
}

export const TodoItem = memo(({todoLayoutMode='grid', isFocused=false, isActive=true, onClick}) => {
    
    const [todoName, setTodoName] = useState('Untitled Todo Incognition task fetch fraction of a second some more text get overflow');
    const [todoState, setTodoState] = useState('incomplete');

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [openDropdownContent, setOpenDropdownContent] = useState(false);

    const [enableRename, setEnableRename] = useState(false);

    const todoRef = useRef(null);
    const todoEditDialogRef = useRef(null);
    const dropdownAnchorRef = useRef(null);
    const [ renameSectionFocus ] = useInsideClick(todoRef);


    useEffect(() => {
        if(!renameSectionFocus) {
          setEnableRename(false)
        }
    }, [renameSectionFocus])
    

    const handleClick = (e) => {
        handleTodoState();
        if(onClick != null) {
            onClick();
        }
        todoEditDialogRef.current.callParentFunction();
    }

    const handleTodoState = () => {
        if(!enableRename) {
            setTodoState(todoState == 'incomplete' ? 'complete' : 'incomplete')
        }
    }

    const handleDropdownOpen = (e) => {
        const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();
        setPosition({ x: getCalculatedPosition(anchorRect.left, 50, 20), y: getCalculatedPosition(e.clientY)});
        setOpenDropdownContent(!openDropdownContent);
    }

    const handleTodoClick = (mode='editName') => {
        switch (mode) {
            case 'editName':
                handleRename()
                break;
            case 'editState':
                
                break;
            case 'changePriority':
                
                break;
            case 'removeTodo':
                
                break;
        }
    }

    const handleRename = (value='') => {
        setEnableRename(true);
        if(value =='cancell') {
            setEnableRename(false);
        }
        if(value.length > 0) {
            setEnableRename(true);
        }
    }

    const handleEnterPress = () => {
        if(enableRename) {
            setEnableRename(false);
        }
    }
    
    useKeyPress('Escape', () => setEnableRename(false));
    useKeyPress('Enter', handleEnterPress);

    const gridStyle = `bg-theme-bgSecondary w-full max-w-[330px] min-h-[100px] px-2 py-2 rounded-xl transition-all duration-150
    ${isFocused ? 'border-4 border-theme-borderNavigation' : 'border-regulerBorder border-transparent hover:border-theme-borderPrimary'}
    ${isActive && isFocused ? 'border-theme-borderPrimary' : ''}`;
    
    const listStyle = `w-full min-h-[40px] p-2 rounded-xl transition-all duration-150
    ${isFocused ? 'border-4 border-theme-borderNavigation' : 'border-regulerBorder border-transparent hover:border-theme-borderPrimary '}
    ${isActive && isFocused ? 'bg-theme-bgTertiary' : 'bg-theme-bgSecondary'}`;

    const currentStyle = todoLayoutMode =='grid' ? gridStyle : listStyle;
    const layoutBasedOffsetForDropdow = todoLayoutMode =='grid' ? 150 : 0;

    return (
        <MorphicElement className={currentStyle}>
            <Container flow='row' justifyItem='between'>
                <ContextMenu className='w-10/12'>
                    <ContextMenuHeader className='w-full flex flex-col space-y-2'>
                        <MorphicElement 
                            onClick={handleClick} 
                            className='flex flex-row items-center justify-start space-x-2 w-full h-[40px]' element='ul'
                            ref={todoRef}
                            >
                            <Typography>
                                { 
                                    todoState == 'incomplete' ? <FaRegCircle/> 
                                    : todoState == 'pending' ? <FaRegDotCircle/> 
                                    : todoState == 'complete' ? <FaCircle/> : <FaRegCircle/> 
                                } 
                            </Typography>
                            {
                                enableRename ? 
                                (
                                    <Input 
                                        
                                        className='w-full bg-transparent hover:bg-transparent text-lg' 
                                        placeholder={todoName} 
                                    />
                                )
                                :
                                (
                                    <Typography className='pointer-events-none'>
                                        {todoName}
                                    </Typography>
                                )
                            }
                        </MorphicElement>
                        <MorphicElement className={`${enableRename ? 'flex' : 'hidden'} flex-row items-center justify-start space-x-3 w-6/12`}>
                            <Button size='small' width='full' onClick={() => handleRename('apply the rukle')}>Apply</Button>
                            <Button size='small' width='full' intent='secondary' onClick={() => handleRename('cancell')}>Cancell</Button>
                        </MorphicElement>
                    </ContextMenuHeader>
                    <ContextMenuContent className='w-[250px] border-theme-borderSecondary'>
                        <TodoContextContent
                            onEditName={() => handleTodoClick('editName')}
                            onEditState={() => handleTodoClick('editState')}
                            onChangePriority={() => handleTodoClick('editPriority')}
                            onRemoveTodo={() => handleTodoClick('removeTodo')}
                        />
                    </ContextMenuContent>
                </ContextMenu>
                <DropDownMenu isOpen={openDropdownContent} onClose={()=>setOpenDropdownContent(false)}>
                    <DropDownHeader ref={dropdownAnchorRef} onClick={(e)=>handleDropdownOpen(e)}>
                        <CiMenuBurger 
                            size='1.2rem'
                            className='text-theme-textTertiary hover:text-theme-textPrimary cursor-pointer'
                        />
                    </DropDownHeader>
                    <Wrapper 
                        style={{top : `${position.y}px`, left : `${position.x + layoutBasedOffsetForDropdow}px`}} 
                        className='fixed w-full pointer-events-none flex-col flex-nowrap items-start justify-start z-10'>
                        <DropDownContent className='relative w-[250px] right-56' open={openDropdownContent}>
                            <TodoContextContent
                                onEditName={() => handleTodoClick('editName')}
                                onEditState={() => handleTodoClick('editState')}
                                onChangePriority={() => handleTodoClick('editPriority')}
                                onRemoveTodo={() => handleTodoClick('removeTodo')}
                            />
                        </DropDownContent>
                    </Wrapper>
                </DropDownMenu>
                
                <TodoEditDialog
                    ref={todoEditDialogRef}
                    todoName={todoName}
                />

                {/*<Dialog open={true}>
                    <DialogContent overlayClassName='bg-black bg-opacity-5' className='max-w-screen-lg w-10/12 max-h-auto bg-theme-bgPrimary rounded-tenpixel border border-theme-borderPrimary' isOpen>
                        
                        <MorphicElement className='w-full bg-theme-bgTertiary p-2 flex flex-row items-center justify-between rounded-md'>
                            <Wrapper flow='row' wrap='no-wrap' element='ul' className='h-[30px] w-11/12 overflow-hidde flex items-center justify-start'>
                                <Typography variant={'h4'} className='text-left truncate'>
                                    {taskContext.selectedTaskGroup} / {todoName}
                                </Typography>
                            </Wrapper>
                            <IoMdClose 
                                size='1.7rem'
                                className='bg-transparent hover:bg-white text-white hover:text-black p-1 rounded-tenpixel'
                            />
                        </MorphicElement>
                        
                        <MorphicElement className='w-full p-2 flex flex-row items-center justify-between'>
                            <MorphicElement className='w-9/12 bg-cyan-500'>
                                {
                                    enableRename ? 
                                    (
                                        <Input 

                                            className='w-full bg-transparent hover:bg-transparent text-lg' 
                                            placeholder={todoName} 
                                        />
                                    )
                                    :
                                    (
                                        <Typography className='pointer-events-none'>
                                            {todoName}
                                        </Typography>
                                    )
                                }
                            </MorphicElement>
                        </MorphicElement>
                    </DialogContent>
                </Dialog> */}
            </Container>
        </MorphicElement>
    )
})

export default TodoItem;