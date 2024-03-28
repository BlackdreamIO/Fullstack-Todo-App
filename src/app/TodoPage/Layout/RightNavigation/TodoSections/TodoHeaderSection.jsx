import { useState, useRef, Fragment } from "react";

import { Typography } from "@/components/typography/typohgraphy";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Button } from "@/components/cva/button/cvaButton";
import { DropDownContent, DropDownMenu, DropDownHeader, getCalculatedPosition } from "@/components/dropDown/DropDown";

import { IoMdArrowDropdown } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
 
export function ContextHeaderComponent({title='untitled', isMinimized=false, onMinimize}) 
{
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);

    const dropdownAnchorRef = useRef(null);

    const handleDropdownOpen = (e) => {
        const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();
        setPosition({ x: getCalculatedPosition(anchorRect.left, 50, 20), y: getCalculatedPosition(e.clientY)});
        setSettingDropdownOpen(true);
    }

    const handleOnMinimize = () => {
        if(onMinimize != null) onMinimize();
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

    return (
        <Wrapper flow='row' wrap='no-wrap' alignItem='center' justifyItem='between' className='w-full pr-2 pointer-events-none'>
            <Typography variant={'h2'}>{title}</Typography>
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