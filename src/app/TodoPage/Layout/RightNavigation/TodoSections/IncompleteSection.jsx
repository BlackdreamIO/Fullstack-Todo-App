import { useState, useEffect, useRef, Fragment} from "react";

import { MorphicElement } from "@/components/morphicElement"
import { Typography } from "@/components/typography/typohgraphy";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Divider } from "@/components/divider";
import { Button } from "@/components/cva/button/cvaButton";
import { Input } from "@/components/input/input";
import { DropDownContent, DropDownMenu, DropDownHeader, getCalculatedPosition } from "@/components/dropDown/DropDown";
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

import { IoMdArrowDropdown } from "react-icons/io";
import { CiSettings } from "react-icons/ci";


export default function InCompleteSection({ onMinimize, isMinimized=false, children }) 
{
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [contextContentSizeProperty, setContextContentSizeProperty] = useState({x : 250, y : 100});
    const [contextDropdownOpen, setContextDropdownOpen] = useState(false);
    const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);
    
    const contextContentRef = useRef(null);
    const dropdownAnchorRef = useRef(null);

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

    const handleDropdownOpen = (e) => {
        const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();
        setPosition({ x: getCalculatedPosition(anchorRect.left, 50, 20), y: getCalculatedPosition(e.clientY)});
        setSettingDropdownOpen(true);
    } 

    const settingDropdownContent = () => {
        return (
            <Fragment>
                <Button width='full' intent='secondary'>Show Details</Button>
                <Button width='full' intent='secondary'>Edit This Section</Button>
                <Button width='full' intent='error'>Delete</Button>
            </Fragment>
        )
    }

    const contextHeader = () => {
        return (
            <Wrapper flow='row' wrap='no-wrap' alignItem='center' justifyItem='between' className='w-full pr-2 pointer-events-none'>
                <Typography variant={'h2'}>Incomplete</Typography>
                <Wrapper flow='row' wrap='no-wrap'>
                    <IoMdArrowDropdown 
                        size='2rem'
                        className='text-theme-textPrimary hover:bg-theme-hoverBgTertiary p-1 rounded-xl pointer-events-auto z-0' 
                        onClick={() => handleOnMinimize()}
                        style={{transform : `rotate(${isMinimized ? 180 : 0}deg)`}}
                    />
                    <DropDownMenu className='w-full' isOpen={settingDropdownOpen} onClose={()=>setSettingDropdownOpen(false)}>
                        <DropDownHeader ref={dropdownAnchorRef} onClick={(e)=>handleDropdownOpen(e)}>
                            <CiSettings 
                                size='2rem'
                                className='text-theme-textTertiary hover:bg-theme-hoverBgTertiary p-1 rounded-xl pointer-events-auto' 
                            />
                        </DropDownHeader>
                        <Wrapper style={{top : `${position.y}px`, left : `${position.x}px`}} className='fixed w-full pointer-events-none flex-col flex-nowrap items-start justify-start z-10' >
                            <DropDownContent className='relative w-[200px] right-36' open={settingDropdownOpen}>
                                {settingDropdownContent()}
                            </DropDownContent>
                        </Wrapper>
                    </DropDownMenu>
                    
                </Wrapper>
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
                        <DropDownHeader onClick={() => setContextDropdownOpen(!contextDropdownOpen)}>
                            <Button width='full' intent='secondary'>Edit This Section</Button>
                        </DropDownHeader>
                        <DropDownContent className='absolute bottom-10 w-[200px]' open={contextDropdownOpen}>
                            <Input placeholder='Rename'/>
                            <Button intent='secondary' width='full'>Change Color</Button>
                            <Button width='full'>Apply Changes</Button>
                        </DropDownContent>
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
                className='flex flex-row flex-wrap items-start justify-start w-full gap-3 overflow-hidden'>
                {
                    children
                }
            </MorphicElement>
        </MorphicElement>
    )
}