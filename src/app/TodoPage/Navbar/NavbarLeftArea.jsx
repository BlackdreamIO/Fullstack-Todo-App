import React, { useCallback, useRef, useState } from 'react';

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
import { useKeyPress, useInsideClick } from '@/hooks/hooksExporter';

export const NavbarLeftArea = () => {

    const [openOptions, setOpenOptions] = useState(false);
    const [openCreateOptions, setOpenCreateOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);
    const [focusSelectedItem, setFocusSelectedItem] = useState(false); 

    const optionRef = useRef(null);
    const [isFocused] = useInsideClick(optionRef);

    const optionsStyle = `dark:text-white text-neutral-700 dark:hover:bg-neutral-600 text-xs text-left 
                        capitilize py-1 px-1 flex flex-row gap-2 items-center justify-start`;

    const handleOptionsClose = () => {
        setOpenOptions(false);
        setOpenCreateOptions(false);
    }

    const settingOptions = [
        {
            name : 'Create',
            icon : <MdCreateNewFolder size='1rem'/>,
            onClick : () => setOpenCreateOptions(true),
            isSelected : false,
        },
        {
            name : 'Sync',
            icon : <IoSyncCircle size='1rem'/>,
            onClick : () => {},
            isSelected : false,
        },
        {
            name : 'Preference',
            icon : <LuPresentation size='1rem'/>,
            onClick : () => {},
            isSelected : false,
        },
        {
            name : 'Manage Account',
            icon : <RiAccountPinBoxFill size='1rem'/>,
            onClick : () => {},
            isSelected : false,
        },
        {
            name : 'Settings',
            icon : <IoMdSettings size='1rem'/>,
            onClick : () => {}
        }
    ]

    const handleArrowUp = useCallback(() => {
        if(isFocused) {
            setFocusSelectedItem(true);
            setSelectedOption(prev => (prev - 1 + settingOptions.length) % settingOptions.length);
        }
        else {
            setFocusSelectedItem(false);
        }
    }, [isFocused])

    const handleArrowDown = useCallback(() => {
        if(isFocused) {
            setFocusSelectedItem(true);
            setSelectedOption(prev => (prev + 1) % settingOptions.length);
        }
        else {
            setFocusSelectedItem(false);
        }
    }, [isFocused, settingOptions.length])

    const handleEnterPress = () => {
        setOpenCreateOptions(false);
        settingOptions.map((setting, index) => {
            if(selectedOption == index) {
                settingOptions[index].onClick();
            }
        })
    }

    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Enter', handleEnterPress);

    return (
        <Container className={'gap-5'}>
            <DropDownMenu onClose={() => handleOptionsClose()} isOpen={openOptions}>
                <DropDownHeader>
                    <h1 onClick={() => setOpenOptions(true)} className='dark:text-neutral-500 dark:hover:text-neutral-100 text-neutral-700 font-robotoMedium text-3xl mb-1 ml-2 uppercase'>
                        <IoReorderThreeOutline/>
                    </h1>
                </DropDownHeader>
                <DropDownContent ref={optionRef} className='dark:bg-[rgb(5,5,5)] left-0 w-[450%] px-1 py-3 cursor-default' open={openOptions}>
                    {
                        settingOptions.map((setting, index) => (
                            <h1
                                key={setting.name}
                                onClick={setting.onClick}
                                className={`${optionsStyle} ${selectedOption == index && focusSelectedItem ? 'bg-neutral-700' : ''}`}>
                                {setting.icon} {setting.name}
                            </h1>
                        ))
                    }
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