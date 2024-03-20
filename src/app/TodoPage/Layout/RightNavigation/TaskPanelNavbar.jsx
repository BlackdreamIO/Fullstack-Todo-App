import { useRef, useState, useEffect } from "react";

import { useTaskContext } from "@/contextAPI/TaskContextAPI";
import { useInsideClick } from "@/hooks/useInsideClick";

import { IoEllipsisVerticalSharp, IoColorFillOutline } from "react-icons/io5";
import { CiGrid41, CiViewList, CiTrash, CiEdit } from "react-icons/ci";
import { LuLayoutPanelTop } from "react-icons/lu";
import { FaListCheck } from "react-icons/fa6";

import { Container } from "@/components/container/container";
import { Divider } from "@/components/divider";
import { Button } from "@/components/cva/button/cvaButton";
import { Wrapper } from "@/components/wrapper/wrapper";
import { MorphicElement } from "@/components/morphicElement";
import { DropDownMenu, DropDownContent, DropDownHeader } from '@/components/dropDown/DropDown';

export default function TaskPanelNavbar() 
{
    const taskContext = useTaskContext();

    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [isLayoutOptionOpen, setIsLayoutOptionOpen] = useState(false);
    const [isOptionThemeSelectionOpen, setIsOptionThemeSelectionOpen] = useState(false);

    const optionDropdownRef = useRef(null);
    const [isOptionFocused] = useInsideClick(optionDropdownRef, false);

    useEffect(() => {
        if(!isOptionFocused) {
            setIsOptionOpen(false);
            setIsLayoutOptionOpen(false);
            setIsOptionThemeSelectionOpen(false);
        }
    }, [isOptionFocused])

    const handleDropdownOpen = () => {
        if(optionDropdownRef == null) return;
        setIsOptionOpen(true);   
    }

    const handleThemeClick = () => {
        setIsOptionThemeSelectionOpen(true);
        setIsLayoutOptionOpen(false);
    }

    const handleLayoutClick = () => {
        setIsLayoutOptionOpen(true);
        setIsOptionThemeSelectionOpen(false);
    }

    const handleChangeNameClick = () => {
        setIsLayoutOptionOpen(false);
        setIsOptionThemeSelectionOpen(false);
    }

    const handleDeleteBoardClick = () => {
        setIsLayoutOptionOpen(false);
        setIsOptionThemeSelectionOpen(false);
    }

    const handleCompleteAllClick = () => {
        setIsLayoutOptionOpen(false);
        setIsOptionThemeSelectionOpen(false);
    }

    return (
        <Container wrap='no-wrap' flow='col' className='max-w-9/12 bg-theme-bgPrimary p-2'>
            <Wrapper flow='row' wrap='no-wrap' justifyItem='between' className='w-full'>
                <MorphicElement element="section" className="max-w-5/12 overflow-hidden">
                    <h5 className="text-theme-textPrimary text-xl font-mono text-left ml-2 truncate">
                        {taskContext.selectedTaskGroup}
                    </h5>
                </MorphicElement>
                <MorphicElement ref={optionDropdownRef} element="section" className="max-w-6/12 flex flex-col items-center justify-center">
                    <DropDownMenu className='float-right z-[1000]' isOpen={isOptionOpen} onClose={() => setIsOptionOpen(false)}>
                        <DropDownHeader>
                            <Button onClick={()=> handleDropdownOpen()} intent='transparent' outline='none' className="w-full text-theme-textPrimary text-xl">
                                <IoEllipsisVerticalSharp/>
                            </Button>
                        </DropDownHeader>

                        <DropDownContent open={isOptionOpen}>
                            <Button onClick={handleLayoutClick} tabIndex={0} size='xs' intent='secondary'> 
                                <LuLayoutPanelTop/> Layout 
                            </Button>
                            <Button onClick={handleThemeClick} tabIndex={0} size='xs' intent='secondary'> 
                                <IoColorFillOutline/> Change Theme 
                            </Button>
                            <Button onClick={handleChangeNameClick} tabIndex={0} size='xs' intent='secondary'> 
                                <CiEdit /> Change Name 
                            </Button>
                            <Button onClick={handleCompleteAllClick} tabIndex={0} size='xs' intent='secondary'> 
                                <FaListCheck/> Complete All Todos 
                            </Button>
                            <Button onClick={handleDeleteBoardClick} tabIndex={0} size='xs' intent='error'> 
                                <CiTrash/> Delete Board 
                            </Button>
                        </DropDownContent>

                        <DropDownContent className='right-[175px]' open={isLayoutOptionOpen}>
                            <Button tabIndex={0} size='xs' intent='secondary' className='flex flex-col items-center justify-center'> 
                                Grid <CiGrid41 size='2rem'/>
                            </Button>
                            <Button tabIndex={0} size='xs' intent='secondary' className='flex flex-col items-center justify-center'>
                                List <CiViewList size='2rem'/>
                            </Button>
                        </DropDownContent>

                        <DropDownContent className='right-[175px]' open={isOptionThemeSelectionOpen}>
                            <Button tabIndex={0} size='xs' intent='secondary'> Defined Color </Button>
                            <Button tabIndex={0} size='xs' intent='secondary'> Custom Color </Button>
                        </DropDownContent>

                    </DropDownMenu>
                </MorphicElement>
            </Wrapper>
            <Divider className='bg-neutral-800 h-[0.2vh]'/>
        </Container>
    )
}
