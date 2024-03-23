import { useState, useEffect, useRef} from "react";

import { MorphicElement } from "@/components/morphicElement"
import { Typography } from "@/components/typography/typohgraphy";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Divider } from "@/components/divider";
import { Button } from "@/components/cva/button/cvaButton";
import { DropDownContent, DropDownMenu, DropDownHeader } from "@/components/dropDown/DropDown";
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

import { IoMdArrowDropdown } from "react-icons/io";
import { BsMouse } from "react-icons/bs";
import { Input } from "@/components/input/input";


export default function CompleteSection({ onMinimize, isMinimized=false, children }) 
{
    const [contextContentSizeProperty, setContextContentSizeProperty] = useState({x : 250, y : 100});
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [contextDropdownOpen, setContextDropdownOpen] = useState(false);
    
    const contextContentRef = useRef(null);
    const dropdownAnchorRef = useRef(null);

    const handleDropdownOpen = (e) => {
        const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();
        setPosition({ x: getCalculatedPosition(anchorRect.left, 50, 20), y: getCalculatedPosition(e.clientY)});
        setContextDropdownOpen(!contextDropdownOpen);
    } 
    // calculate the x and y position so that element doesnt get out of bound
    const getCalculatedPosition = (value, threashold=375, minusOffset=120) => {
        const calculatedAxis = value < threashold ? value : value - minusOffset;
        return calculatedAxis;
    }

    const handleOnMinimize = () => {
        if(onMinimize != null) onMinimize();
    }

    useEffect(() => {
        if(contextContentRef.current) {
            const contextContentWidth = contextContentRef.current.offsetWidth + 150;
            const contextContentHeight = contextContentRef.current.offseHeight + 100;
            setContextContentSizeProperty({ x : contextContentWidth, y : 200 })
        }
    }, [contextContentRef.current])

    const contextHeader = () => {
        return (
            <Wrapper flow='row' wrap='no-wrap' alignItem='center' justifyItem='between' className='w-full pr-2 pointer-events-none'>
                <Typography variant={'h2'}>Complete</Typography>
                <div className='bg-theme-bgTertiary w-full h-[30px]'></div>
                <IoMdArrowDropdown 
                    size='2rem'
                    className='text-theme-textPrimary hover:bg-theme-hoverBgTertiary p-1 rounded-xl pointer-events-auto' 
                    onClick={() => handleOnMinimize()}
                    style={{transform : `rotate(${isMinimized ? 180 : 0}deg)`}}
                />
            </Wrapper>
        )
    }

    return (
        <MorphicElement className='flex flex-row flex-wrap items-center justify-start gap-2 w-full'>
            
            <ContextMenu contextContentSize={contextContentSizeProperty} className='w-full'>
                <ContextMenuHeader>
                   {contextHeader()}
                </ContextMenuHeader>
                <ContextMenuContent className='w-[200px] h-auto space-y-2' ref={contextContentRef}>
                    <Button width='full' intent='secondary'>Show Details</Button>
                    <DropDownMenu className='w-full' isOpen={contextDropdownOpen} onClose={() => setContextDropdownOpen(false)}>
                        <DropDownHeader ref={dropdownAnchorRef} onClick={(e) => handleDropdownOpen(e)}>
                            <Button width='full' intent='secondary'>Edit This Section</Button>
                        </DropDownHeader>
                        <Wrapper style={{top : `${position.y}px`, left : `${position.x}px`}} className='fixed w-full pointer-events-none flex-col flex-nowrap items-start justify-start' >
                            <DropDownContent className='relative pointer-events-auto right-40 bg-theme-bgPrimary bottom-10 border border-theme-borderSecondary' open={contextDropdownOpen}>
                                <Input placeholder='Rename'/>
                                <Button intent='secondary' width='full'>Change Color</Button>
                                <Button width='full'>Apply Changes</Button>
                            </DropDownContent>
                        </Wrapper>
                    </DropDownMenu>
                    <Button width='full' intent='error'>Delete</Button>
                </ContextMenuContent>
            </ContextMenu>
            <Divider className='bg-theme-borderPrimary'/>

            <MorphicElement style={{
                    height : isMinimized ? '0px' : 'auto',
                    transition : 'height 0.1s ease-out'
                }}
                element='ul'
                className='flex flex-col items-start justify-start w-full space-y-2 overflow-hidden'>
                {
                    children
                }
            </MorphicElement>
        </MorphicElement>
    )
}
