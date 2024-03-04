import { useRef, useState, useEffect } from "react";

import { useTaskContext } from "@/contextAPI/TaskContextAPI";
import { useInsideClick } from "@/hooks/useInsideClick";

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Container } from "@/components/container/container";
import { Divider } from "@/components/divider";
import { Button } from "@/components/cva/button/cvaButton";
import { Wrapper } from "@/components/wrapper/wrapper";
import { MorphicElement } from "@/components/MorphicElement";
import { DropDownMenu, DropDownContent, DropDownHeader } from '@/components/dropDown/DropDown';

export default function TaskPanelNavbar() 
{
    const taskContext = useTaskContext();

    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [isOptionThemeSelectionOpen, setIsOptionThemeSelectionOpen] = useState(false);

    const optionDropdownRef = useRef(null);
    const [isOptionFocused] = useInsideClick(optionDropdownRef, false);

    useEffect(() => {
        setIsOptionOpen(isOptionFocused ? true : false);
        if(!isOptionFocused) {
            setIsOptionThemeSelectionOpen(false)
        }
    }, [isOptionFocused])

    const handleDropdownOpen = () => {
        if(optionDropdownRef == null) return;
        setIsOptionOpen(true);   
    }

    const handleThemeClick = () => {
        setIsOptionThemeSelectionOpen(true)
    }

    return (
        <Container wrap='no-wrap' flow='col' className='max-w-9/12 '>
            <Wrapper flow='row' wrap='no-wrap' justifyItem='between' className='w-full'>
                <MorphicElement element="section" className="max-w-5/12 overflow-hidden">
                    <h5 className="dark:text-white text-xl font-mono text-left ml-2 truncate">
                        {taskContext.selectedTaskGroup}
                    </h5>
                </MorphicElement>
                <MorphicElement ref={optionDropdownRef} element="section" className="max-w-6/12 flex flex-col items-center justify-center">
                    <DropDownMenu className='float-right z-[1000]' isOpen={isOptionOpen} onClose={() => setIsOptionOpen(false)}>
                        <DropDownHeader>
                            <Button onClick={ ()=> handleDropdownOpen()} intent='transparent' outline='none' className="w-full text-white text-xl">
                                <IoEllipsisVerticalSharp/>
                            </Button>
                        </DropDownHeader>
                        <DropDownContent open={isOptionOpen}>
                            <Button tabIndex={0} size='xs' intent='secondary'> Layout </Button>
                            <Button tabIndex={0} size='xs' intent='secondary'> Complete All Todos </Button>
                            <Button onClick={handleThemeClick} tabIndex={0} size='xs' intent='secondary'> Change Theme </Button>
                            <Button tabIndex={0} size='xs' intent='secondary'> Change Name </Button>
                            <Button tabIndex={0} size='xs' intent='error'> Delete Board </Button>
                        </DropDownContent>
                        <DropDownContent className='right-[17vw]' open={isOptionThemeSelectionOpen}>
                            <Button tabIndex={0} size='xs' intent='secondary'> Defined Color </Button>
                            <Button tabIndex={0} size='xs' intent='secondary'> Custom Color </Button>
                            <Button tabIndex={0} size='xs' intent='secondary'> Back </Button>
                        </DropDownContent>
                    </DropDownMenu>
                </MorphicElement>
            </Wrapper>
            <Divider className='dark:bg-neutral-800 h-[0.2vh]'/>
        </Container>
    )
}
