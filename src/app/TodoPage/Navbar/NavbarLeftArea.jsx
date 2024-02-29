import React, { useCallback, useRef, useState, useEffect } from 'react';

import { IoMdSettings } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { LuPresentation } from "react-icons/lu";
import { IoSyncCircle, IoReorderThreeOutline } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { BsBox2Fill } from "react-icons/bs";
import { FaStickyNote } from "react-icons/fa";

import { DropDownMenu, DropDownContent, DropDownHeader  } from '@/components/dropDown/DropDown';
import { Container } from '@/components/container/container';
import { useKeyPress, useInsideClick } from '@/hooks/hooksExporter';

export const NavbarLeftArea = () => {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isCreateOptionsOpen, setIsCreateOptionsOpen] = useState(false);
    const [isItemFocused, setIsItemFocused] = useState(false);

    const [selectedPrimaryIndex, setSelectedPrimaryIndex] = useState(-1);
    const [selectedCreateIndex, setSelectedCreateIndex] = useState(-1);


    const optionsRef = useRef(null);
    const createOptionRef = useRef(null);
    
    const [ isInsideOptions ] = useInsideClick(optionsRef);
    const [ isInsideCreateOption ] = useInsideClick(createOptionRef);


    const optionsStyle = `dark:text-white text-neutral-700 dark:hover:bg-neutral-600 text-xs text-left 
                        capitilize py-1 px-1 flex flex-row gap-2 items-center justify-start rounded-md`;

    const settingOptions = [
        { name: 'Create', icon: <MdCreateNewFolder size='1rem'/>, onClick : () => setIsCreateOptionsOpen(true)},
        { name: 'Sync', icon: <IoSyncCircle size='1rem'/>, onClick : () => {} },
        { name: 'Preference', icon: <LuPresentation size='1rem'/>, onClick : () => {} },
        { name: 'Manage Account', icon: <RiAccountPinBoxFill size='1rem'/>, onClick : () => {} },
        { name: 'Settings', icon: <IoMdSettings size='1rem'/>, onClick : () => {} }
    ]
    const createOptions = [
        { name: 'Create New Todo Board', icon: <BsBox2Fill size='1rem'/> },
        { name: 'Create New Note Board', icon: <FaStickyNote size='1rem'/> }
    ]

    useEffect(() => {
        if(!isInsideCreateOption || !isInsideOptions) {
            setIsCreateOptionsOpen(false);
        }
    }, [isInsideCreateOption])
    

    const handleOptionsClose = () => { setIsOptionsOpen(false); setIsCreateOptionsOpen(false); }

    const handleArrowUp = useCallback(() => {
        if(isInsideOptions) {
            setIsItemFocused(true);
            setSelectedPrimaryIndex(prev => (prev - 1 + settingOptions.length) % settingOptions.length);
        }
        // if(isInsideOptions && openCreateOptions) {
        //     setSelectedCreateOption(prev => (prev - 1 + createOptions.length) % createOptions.length);
        // }
        else {
            setIsItemFocused(false);
        }
    }, [isInsideOptions])

    const handleArrowDown = useCallback(() => {
        if(isInsideOptions) {
            setIsItemFocused(true);
            setSelectedPrimaryIndex(prev => (prev + 1) % settingOptions.length);
        }
        // if(isInsideOptions && openCreateOptions) {
        //     setSelectedCreateOption(prev => (prev + 1) % createOptions.length);
        //     setIsItemFocused(true);
        // }
        else{
            setIsItemFocused(false);
        }
    }, [isInsideOptions, settingOptions.length])

    const handleEnterPress = () => {
        setIsCreateOptionsOpen(false);
        settingOptions.map((setting, index) => {
            if(selectedPrimaryIndex == index) {
                settingOptions[index].onClick();
            }
        })
    }

    const handleMouseClicks = () => {
        setIsItemFocused(false);
        if(isInsideCreateOption == false) {
            setIsCreateOptionsOpen(false);
        }
    }

    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Enter', handleEnterPress);
    document.addEventListener('mousedown', handleMouseClicks);

    return (
        <Container ref={optionsRef} className={'gap-5 cursor-default select-none'}>
            <DropDownMenu onClose={() => handleOptionsClose()} isOpen={isOptionsOpen}>
                <DropDownHeader>
                    <h1 onClick={() => setIsOptionsOpen(true)} className='dark:text-neutral-500 dark:hover:text-neutral-100 text-neutral-700 font-robotoMedium text-3xl mb-1 ml-2 uppercase'>
                        <IoReorderThreeOutline/>
                    </h1>
                </DropDownHeader>
                <DropDownContent className='dark:bg-neutral-900 left-0 w-[450%] px-1 py-3 cursor-default' open={isOptionsOpen}>
                    {
                        settingOptions.map((setting, index) => (
                            <h1
                                key={setting.name}
                                onClick={setting.onClick}
                                className={`${optionsStyle} ${selectedPrimaryIndex == index && isItemFocused ? 'bg-neutral-700' : ''}`}>
                                {setting.icon} {setting.name}
                            </h1>
                        ))
                    }
                </DropDownContent>
                <DropDownContent ref={createOptionRef} className='dark:bg-neutral-900 left-44 w-[600%] top-9 px-1 py-3 cursor-default' open={isCreateOptionsOpen}>
                    {
                        createOptions.map((option, index) => (
                            <h1 className={`${optionsStyle} ${selectedCreateIndex == index && isItemFocused ? 'bg-neutral-700' : ''}`} 
                                onClick={option.onClick}
                                key={option.name}>
                                {option.icon} {option.name}
                            </h1> 
                        ))
                    }
                </DropDownContent>
            </DropDownMenu>
            <h1 className='dark:text-white text-neutral-700 text-left  font-mono text-xl mb-1 uppercase'>Task Flow</h1>            
        </Container>
    )
}