import { useState, useEffect, useRef, useCallback, memo, useMemo,} from "react";
import { useTaskManagerContext } from "@/contextAPI/TaskManagerContextAPI";
import { useKeyPress } from "@/hooks/useKeyPress";
import { useInsideClick } from "@/hooks/useInsideClick";

import { MorphicElement } from "@/components/morphicElement"
import { Divider } from "@/components/divider";
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

import TodoItem from "../Todo/TodoItem";
import { ContextHeaderComponent } from "./TodoHeaderSection";
import { ContextMenuComponent } from "./TodoContentSection";
import { Input } from "@/components/cva/input/input";
import { Typography } from "@/components/typography/typohgraphy";
import { Button } from "@/components/cva/button/cvaButton";

import { IoMdArrowDropdown } from "react-icons/io";

export default function InCompleteSection({ onMinimize, isMinimized=false, children, todos=[] }) 
{
    const [contextContentSizeProperty, setContextContentSizeProperty] = useState({x : 250, y : 100});
    
    const [showAddTodoSection, setShowAddTodoSection] = useState(false);
    const [addTodoSectionFocus, SetaddTodoSectionFocus] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);
    const [showFocusElement, setShowFocusElement] = useState(false);
    const [tabFocused, setTabFocused] = useState(false);
    
    const sectionRef = useRef(null);
    const contextContentRef = useRef(null);

    const [ isFocused ] = useInsideClick(sectionRef);
    const taskManagerContext = useTaskManagerContext();


    useEffect(() => {
        if(contextContentRef.current) {
            const contextContentWidth = contextContentRef.current.offsetWidth + 150;
            const contextContentHeight = contextContentRef.current.offseHeight + 100;
            setContextContentSizeProperty({ x : contextContentWidth, y : 200 })
        }
    }, [contextContentRef.current])

   useEffect(() => {
        if(focusIndex === activeIndex) setShowFocusElement(false);
    }, [focusIndex])
    useEffect(() => {
        if(!isFocused && !tabFocused) {
            setShowFocusElement(false);
        }
    }, [isFocused, tabFocused])
    

    const handleTodoClick = useCallback((index) => {
        setActiveIndex(index);
        setFocusIndex(index);
    }, [todos])

    const handleArrowUp = useCallback(() => {
        if (isFocused || tabFocused) {
            setShowFocusElement(true);
            setFocusIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }
    }, [isFocused, tabFocused]);

    const handleArrowDown = useCallback(() => {
        if (isFocused || tabFocused) {
            setShowFocusElement(true);
            setFocusIndex(prevIndex => Math.min(prevIndex + 1, todos.length - 1));
        }
    }, [isFocused, tabFocused, todos?.length]);

    const handleEnter = useCallback(() => {
        if (isFocused) {
            setActiveIndex(focusIndex);
            setShowFocusElement(false);
            taskContext.setSelectedTaskGroup(todos[focusIndex].title);
        }
    }, [focusIndex, isFocused]);

    const hanleOnFocus = () => {
        setTabFocused(true);
        setShowFocusElement(true);
    }; 
    const hanleOnBlur = () => setTabFocused(false);

    const handleMinimizeAddTodoSection = () => {
        setShowAddTodoSection(!showAddTodoSection);
    }

    const handleAddTodoSectionFocus = () => {
        SetaddTodoSectionFocus(true);
        if(addTodoSectionFocus) {
            handleMinimizeAddTodoSection();
        }
    }

    const handleAddTodoSectionBlur = () => {
        SetaddTodoSectionFocus(false);
        if(addTodoSectionFocus) {
            handleMinimizeAddTodoSection();
        }
    }

    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Escape', () => {
        if(sectionRef.current) {
            sectionRef.current.blur();
            setShowFocusElement(false);
        }
    })
    
    const MemoizedTodoItem = useMemo(() => {
        return memo(TodoItem, (prevProps, nextProps) => {
            return  prevProps.isActive === nextProps.isActive && 
                    prevProps.isFocused === nextProps.isFocused &&
                    prevProps.todoLayoutMode === nextProps.todoLayoutMode;
        })
    }, [])

    return (
        <MorphicElement 
            className='flex flex-row flex-wrap items-center justify-start gap-2 w-full'>
            
            {/* Header Section */}

            <ContextMenu contextContentSize={contextContentSizeProperty} className='w-full'>
                <ContextMenuHeader>
                   <ContextHeaderComponent
                        isMinimized={isMinimized}
                        onMinimize={() => onMinimize()}
                   />
                </ContextMenuHeader>
                <ContextMenuContent className='w-[200px] h-auto space-y-2' ref={contextContentRef}>
                    <ContextMenuComponent />
                </ContextMenuContent>
            </ContextMenu>

            <Divider className='bg-theme-borderPrimary'/>

            {/* Todo Section */}

            <MorphicElement style={{
                    height : isMinimized ? '0px' : 'auto',
                    transition : 'height 0.1s ease-out'
                }}
                element='ul'
                className='flex flex-row flex-wrap items-start justify-start w-full gap-3 overflow-hidden outline-none'
                tabIndex={2}
                onFocus={hanleOnFocus} 
                onBlur={hanleOnBlur} 
                ref={sectionRef}>
                {
                    todos.map((todo, currentIndex) => (
                        <MemoizedTodoItem
                            onClick={() => handleTodoClick(currentIndex)}
                            isActive={currentIndex == activeIndex}
                            isFocused={currentIndex == focusIndex && showFocusElement}
                            todoLayoutMode={taskManagerContext.layoutMode}
                            key={currentIndex}
                        />
                    ))
                }
            </MorphicElement>
            
            {/* Create New Todo Section */}

            <MorphicElement className='w-full flex flex-col px-1 space-y-3 mt-5'>
                <MorphicElement element='ul' className='group w-full flex flex-row items-center justify-between'
                    onClick={() => handleMinimizeAddTodoSection()}>
                    <Typography className='text-theme-textTertiary group-hover:text-theme-textPrimary'>Add New Task</Typography>
                    <Typography className='text-theme-textTertiary mr-2'>
                        <IoMdArrowDropdown 
                            size='1.5rem'
                            tabIndex={1}
                            onFocus={handleAddTodoSectionFocus}
                            onBlur={handleAddTodoSectionBlur}
                            className='text-theme-textPrimary hover:bg-theme-hoverBgTertiary p-1 rounded-xl pointer-events-auto z-0' 
                        />
                    </Typography>
                </MorphicElement>

                <MorphicElement className='w-full space-y-3' element='section' style={{display : showAddTodoSection ? 'none' : 'block'}}>
                    <Input
                        width='full' 
                        className='py-2 bg-theme-bgSecondary hover:bg-theme-bgSecondary 
                        border-2 border-transparent hover:border-theme-borderPrimary
                        focus-visible:border-theme-borderPrimary'
                        placeholder='Task Name'
                    />
                    <MorphicElement element='ul' className='w-full flex flex-row items-center justify-start space-x-3'>
                        <Button intent='secondary'>Add</Button>
                        <Button intent='secondary'>Setting</Button>
                        <Button intent='secondary'>Cancell</Button>
                    </MorphicElement>
                </MorphicElement>
            </MorphicElement>

        </MorphicElement>
    )
}