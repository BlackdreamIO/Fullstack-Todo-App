import { useState, useEffect, useRef, useCallback, memo, useMemo,} from "react";
import { useTaskManagerContext } from "@/contextAPI/TaskManagerContextAPI";
import { useKeyboardNavigationContext } from "@/contextAPI/KeybaordNavigationContextAPI";
import { useKeyPress } from "@/hooks/useKeyPress";
import { useInsideClick } from "@/hooks/useInsideClick";

import { MorphicElement } from "@/components/morphicElement"
import { Divider } from "@/components/divider";
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

import { ContextHeaderComponent } from "./TodoHeaderSection";
import { ContextMenuComponent } from "./TodoContentSection";

import CreateTodoSection from "./CreateTodoSection";
import TodoItem from "../Todo/TodoItem";


export default function TodoSegmentSection({ title='untitled', todos=[] }) 
{
    const [contextContentSizeProperty, setContextContentSizeProperty] = useState({x : 250, y : 100});

    const [activeIndex, setActiveIndex] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);
    const [showFocusElement, setShowFocusElement] = useState(false);
    const [tabFocused, setTabFocused] = useState(false);
    
    const [minimizeSegmentSection, setSetMinimizeIncomplete] = useState(false);

    const sectionRef = useRef(null);
    const contextContentRef = useRef(null);

    const [ isFocused ] = useInsideClick(sectionRef);
    const taskManagerContext = useTaskManagerContext();
    const keyboardNavigationContext = useKeyboardNavigationContext(); // { keybaordNavigationEnabled, setKeybaordNavigationEnabled }
    const kbnEnabled = keyboardNavigationContext.keybaordNavigationEnabled;

    const onMinimize = () => {
        setSetMinimizeIncomplete(!minimizeSegmentSection);
    }

    useEffect(() => {
        if(contextContentRef.current) {
            const contextContentWidth = contextContentRef.current.offsetWidth + 150;
            const contextContentHeight = contextContentRef.current.offseHeight + 100;
            setContextContentSizeProperty({ x : contextContentWidth, y : 200 })
        }
    }, [contextContentRef.current])

   useEffect(() => {
        if(focusIndex === activeIndex) setShowFocusElement(false);
    }, [focusIndex, activeIndex])

    useEffect(() => {
        if(!isFocused && !tabFocused) setShowFocusElement(false);
        if(!kbnEnabled) setShowFocusElement(false);
    }, [isFocused, tabFocused, kbnEnabled])
    

    const handleTodoClick = (index) => {
        setActiveIndex(index);
        setFocusIndex(index);
    }

    const handleArrowUp = useCallback(() => {
        if ((isFocused || tabFocused) && kbnEnabled) {
            setShowFocusElement(true);
            setFocusIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }
    }, [isFocused, tabFocused, kbnEnabled]);

    const handleArrowDown = useCallback(() => {
        if ((isFocused || tabFocused) && kbnEnabled) {
            setShowFocusElement(true);
            setFocusIndex(prevIndex => Math.min(prevIndex + 1, todos.length - 1));
        }
    }, [isFocused, tabFocused, kbnEnabled, todos?.length]);

    const handleEnter = useCallback(() => {
        if (isFocused) {
            setActiveIndex(focusIndex);
            setShowFocusElement(false);
            taskContext.setSelectedTaskGroup(todos[focusIndex].title);
        }
    }, [focusIndex, isFocused]);

    const hanleOnFocus = () => {
        if(kbnEnabled) {
            setTabFocused(true);
            setShowFocusElement(true);
        }
    }; 
    const hanleOnBlur = () => setTabFocused(false);

    const layoutModeIsGrid = taskManagerContext.layoutMode == 'list';

    useKeyPress(layoutModeIsGrid ? 'ArrowUp' : 'ArrowLeft', handleArrowUp);
    useKeyPress(layoutModeIsGrid ?  'ArrowDown' : 'ArrowRight', handleArrowDown);
    useKeyPress('Tab', () =>{
        if(tabFocused || isFocused) {
            setShowFocusElement(false);
        }
    })
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
                        title={title}
                        isMinimized={minimizeSegmentSection}
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
                    height : minimizeSegmentSection ? '0px' : 'auto',
                    transition : 'height 0.1s ease-out'
                }}
                element='ul'
                className='flex flex-row flex-wrap items-start justify-start w-full gap-3 overflow-hidden outline-none'
                tabIndex={kbnEnabled ? 2 : -1}
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

            <CreateTodoSection 
                isTodoSectionMinimized={minimizeSegmentSection} 
            />

        </MorphicElement>
    )
}