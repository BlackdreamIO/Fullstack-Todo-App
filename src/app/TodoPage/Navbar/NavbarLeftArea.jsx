import React, { useState } from 'react';

import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { LuPresentation } from "react-icons/lu";
import { IoSyncCircle } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { BsBox2Fill } from "react-icons/bs";
import { FaStickyNote } from "react-icons/fa";

import { DropDownMenu, DropDownContent, DropDownHeader  } from '@/components/dropDown/DropDown';
import { Container } from '@/components/container/container';

export const NavbarLeftArea = () => {

    const [openOptions, setOpenOptions] = useState(false);
    const [openCreateOptions, setOpenCreateOptions] = useState(false);

    const optionsStyle = `dark:text-white text-neutral-700 dark:hover:bg-neutral-600 text-xs text-left capitilize py-1 px-1 flex flex-row gap-2 items-center justify-start`

    const handleOptionsClose = () => {
        setOpenOptions(false);
        setOpenCreateOptions(false);
    }

    return (
        <Container className={'gap-5'}>
            <DropDownMenu onClose={() => handleOptionsClose()} isOpen={openOptions}>
                <DropDownHeader >
                    <h1 onClick={() => setOpenOptions(true)} className='dark:text-neutral-500 dark:hover:text-neutral-100 text-neutral-700 font-robotoMedium text-3xl mb-1 ml-2 uppercase'>
                        <IoReorderThreeOutline/>
                    </h1>
                </DropDownHeader>
                <DropDownContent className='dark:bg-[rgb(5,5,5)] left-0 w-[450%] px-1 py-3 cursor-default' open={openOptions}>
                    <h1 onClick={() => setOpenCreateOptions(true)} className={optionsStyle}>
                       <MdCreateNewFolder size='1rem'/> Create
                    </h1> 
                    <h1 className={optionsStyle}>
                       <IoSyncCircle size={'1rem'}/> Sync
                    </h1>
                    <h1 className={optionsStyle}>
                       <LuPresentation size={'1rem'}/> Preference
                    </h1> 
                    <h1 className={optionsStyle}>
                       <RiAccountPinBoxFill size={'1rem'}/> Manage Account
                    </h1> 
                    <h1 className={optionsStyle}>
                       <IoMdSettings size={'1rem'} /> Settings
                    </h1> 
                </DropDownContent>
                <DropDownContent className='dark:bg-[rgb(5,5,5)] left-44 w-[600%] top-9 px-1 py-3 cursor-default' open={openCreateOptions}>
                    <h1 className={optionsStyle}>
                        <BsBox2Fill size={'1rem'} /> Create New Todo Board
                    </h1>
                    <h1 className={optionsStyle}>
                        <FaStickyNote size={'1rem'} /> Create New Notes Board
                    </h1> 
                </DropDownContent>
            </DropDownMenu>
            <h1 className='dark:text-white text-neutral-700 text-left  font-mono text-xl mb-1 uppercase'>Task Flow</h1>            
        </Container>
    )
}