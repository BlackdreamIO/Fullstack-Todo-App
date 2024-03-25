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

export default function InCompleteSection({ onMinimize, isMinimized=false, children, todos=[] }) 
{
    const [contextContentSizeProperty, setContextContentSizeProperty] = useState({x : 250, y : 100});
    
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

    const hanleOnFocus = () => setTabFocused(true); 
    const hanleOnBlur = () => setTabFocused(false);


    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Escape', () => {
        if(sectionRef.current) {
            sectionRef.current.blur();
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
                className='flex flex-row flex-wrap items-start justify-start w-full gap-3 overflow-hidden  outline-none focus-visible:bg-theme-bgTertiary'
                tabIndex={1}
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
        </MorphicElement>
    )
}