import { useState, useEffect, useRef, Fragment } from 'react';

import { MorphicElement } from "@/components/morphicElement";
import { Input } from "@/components/cva/input/input";
import { Typography } from "@/components/typography/typohgraphy";
import { Button } from "@/components/cva/button/cvaButton";
import { BarLoader } from 'react-spinners';
import { Dialog, DialogContent, DialogHeader } from "@/components/dialog/DialogComponent";

import { IoMdArrowDropdown } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useKeyboardNavigationContext } from '@/contextAPI/KeybaordNavigationContextAPI';

export default function CreateTodoSection({isTodoSectionMinimized=false}) 
{
    const [showAddTodoSection, setShowAddTodoSection] = useState(false);
    const [addTodoSectionFocus, SetaddTodoSectionFocus] = useState(false);

    const [openSettingDialog, setOpenSettingDialog] = useState(false);

    const keyboardNavigationContext = useKeyboardNavigationContext(); // { keybaordNavigationEnabled, setKeybaordNavigationEnabled }
    const kbnEnabled = keyboardNavigationContext.keybaordNavigationEnabled;

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

    return (
        <Fragment>
            <MorphicElement className={`w-full ${isTodoSectionMinimized ? 'hidden' : 'flex'} flex-col px-2 py-2 space-y-3 mt-5 border border-theme-borderPrimary rounded-tenpixel`}>
                <BarLoader loading={false} color='white' height='2px' width='100%' />
                <MorphicElement 
                    element='ul' 
                    className='group w-full flex flex-row items-center justify-between'
                    onClick={() => handleMinimizeAddTodoSection()}>

                    <Typography className='text-theme-textTertiary group-hover:text-theme-textPrimary'>Add New Task</Typography>
                    <Typography className='text-theme-textTertiary mr-2'>
                        <IoMdArrowDropdown 
                            size='1.5rem'
                            
                            onFocus={handleAddTodoSectionFocus}
                            onBlur={handleAddTodoSectionBlur}
                            className='text-theme-textPrimary hover:bg-theme-hoverBgTertiary p-1 rounded-xl pointer-events-auto z-0' 
                        />
                    </Typography>
                </MorphicElement>

                <MorphicElement 
                    className={`w-full overflow-hidden space-y-3 transition-all duration-150 `} 
                    element='section' 
                    style={{maxHeight : showAddTodoSection ? '0px' : '400px'}}>
                    <Input
                        width='full' 
                        className='py-2 bg-theme-bgSecondary hover:bg-theme-bgSecondary 
                        border-2 border-transparent hover:border-theme-borderPrimary
                        focus-visible:border-theme-borderPrimary'
                        placeholder='Task Name'
                    />
                    <MorphicElement element='ul' className='w-full flex flex-row items-center justify-start space-x-3'>
                        <Button intent='secondary' onClick={() => setOpenSettingDialog(true)}>Add</Button>
                        <Button intent='secondary'>Setting</Button>
                        <Button intent='secondary'>Cancell</Button>
                    </MorphicElement>
                </MorphicElement>
            </MorphicElement>

            <Dialog open={openSettingDialog}>
                <DialogContent className='max-w-screen-xl w-[700px] bg-theme-bgPrimary p-2 rounded-tenpixel border border-theme-borderPrimary' isOpen={openSettingDialog} onClose={() => setOpenSettingDialog(false)}>
                    <MorphicElement className='w-full flex flex-row items-center justify-between px-1'>
                        <Typography variant='h4' className='text-theme-textPrimary w-11/12'>Add New Task name could change due to current state  much continue to the fact of 8inch small pizza with extra sausgae and cheese</Typography>
                        <MdClose size='1.2rem' className='self-center w-1/12' />
                    </MorphicElement>
                    <MorphicElement element='ul' className='w-full flex flex-row items-center justify-start space-x-3 h-[300px]'>
                        <Button intent='secondary'>Add</Button>
                        <Button intent='secondary'>Setting</Button>
                        <Button intent='secondary'>Cancell</Button>
                    </MorphicElement>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
