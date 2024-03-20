import React, { useCallback, useRef, useState, useEffect } from 'react';

import { IoMdSettings } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { LuPresentation } from "react-icons/lu";
import { IoSyncCircle, IoReorderThreeOutline } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { BsBox2Fill } from "react-icons/bs";
import { FaStickyNote } from "react-icons/fa";

import { Container } from '@/components/container/container';
import { DropDownMenu, DropDownContent, DropDownHeader  } from '@/components/dropDown/DropDown';
import { useKeyPress, useInsideClick } from '@/hooks/hooksExporter';
import { Wrapper } from '@/components/wrapper/wrapper';

export function NavbarLeftArea()
{
    const [isSettingDropdownOpen, setIsSettingDropdownOpen] = useState(false);
    const [isItemFocused, setIsItemFocused] = useState(false);
    const [tabFocus, setTabFocus] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedDropdownContent, setSelectedDropdownContent] = useState([]);

    const optionsRef = useRef(null);
    const [ isInsideOptions ] = useInsideClick(optionsRef);
    

    const optionsStyle = `dark-theme:text-white loght-theme:text-neutral-700 dark-theme:hover:bg-neutral-800 text-sm text-left 
                        capitilize py-2 px-1 flex flex-row gap-2 items-center justify-start rounded-md
                        flex flex-row justify-between`;

    const defaultOptions = [
        { name: 'Create', key : 'CTRL + N', icon: <MdCreateNewFolder size='1rem'/>, onClick : () => changeDropdownContent(createOptions)},
        { name: 'Sync', key : 'CTRL + S', icon: <IoSyncCircle size='1rem'/>, onClick : () => {} },
        { name: 'Preference', key : 'ctrl + i', icon: <LuPresentation size='1rem'/>, onClick : () => {} },
        { name: 'Manage Account', icon: <RiAccountPinBoxFill size='1rem'/>, onClick : () => {} },
        { name: 'Settings', icon: <IoMdSettings size='1rem'/>, onClick : () => {} }
    ]
    const createOptions = [
        { name: 'Create New Todo Board', icon: <BsBox2Fill size='1rem'/>, onClick : () => {} },
        { name: 'Create New Note Board', icon: <FaStickyNote size='1rem'/>, onClick : () => {} },
        { name: 'Back', onClick : () => changeDropdownContent(defaultOptions) }
    ]

    useEffect(() => {
        setSelectedDropdownContent(defaultOptions);
    }, [])
    
    const handleOptionsClose = () => { 
        if(!isInsideOptions || tabFocus) {
            setIsSettingDropdownOpen(false);
            changeDropdownContent(defaultOptions);
        } 
    }

    const handleArrowUp = useCallback(() => {
        if(isInsideOptions) {
            setIsItemFocused(true);
            setSelectedIndex(prev => (prev - 1 + selectedDropdownContent.length) % selectedDropdownContent.length);
        }
        else {
            setIsItemFocused(false);
        }
    }, [isInsideOptions, selectedDropdownContent.length])

    const handleArrowDown = useCallback(() => {
        if(isInsideOptions) {
            setIsItemFocused(true);
            setSelectedIndex(prev => (prev + 1) % selectedDropdownContent.length);
        }
        else {
            setIsItemFocused(false);
        }
    }, [isInsideOptions, selectedDropdownContent.length])

    const handleEnterPress = () => {
        if(tabFocus) {
            setIsSettingDropdownOpen(true);
            if (optionsRef.current) {
                setTimeout(() => {
                    optionsRef.current.focus();
                }, 0); // Ensure focus is set after the component has rendered
            }
        }
        selectedDropdownContent.forEach((option, index) => {
            if (selectedIndex === index) {
                option.onClick();
            }
        })
    }

    useKeyPress('ArrowUp', handleArrowUp);
    useKeyPress('ArrowDown', handleArrowDown);
    useKeyPress('Enter', handleEnterPress);
    document.addEventListener('mousedown', () => setIsItemFocused(false));

    const changeDropdownContent = (content) => {
        setSelectedDropdownContent(content);
    }

    return (
        <Container ref={optionsRef} className={'w-6/12 flex-nowrap justify-start items-start select-none space-x-2'}>
            <DropDownMenu onClose={() => handleOptionsClose()} isOpen={isSettingDropdownOpen}>
                <DropDownHeader>
                    <h1 
                        tabIndex={1} 
                        onFocus={() => setTabFocus(true)} 
                        onBlur={() => {setTabFocus(false)}} 
                        onClick={() => setIsSettingDropdownOpen(true)} 
                        className='text-theme-textTertiary hover:text-theme-textPrimary text-3xl mb-1 ml-2 uppercase
                        dark-theme:focus:outline-none dark-theme:focus:border-none dark-theme:focus:text-theme-textPrimary'>
                        <IoReorderThreeOutline/>
                    </h1>
                </DropDownHeader>
                <DropDownContent className='bg-theme-bgSecondary border-neutral-800 left-0 w-[400px] px-1 py-3 mt-3 cursor-default z-50' open={isSettingDropdownOpen}>
                    {
                        selectedDropdownContent.map((option, index) => (
                            <h1
                                key={option.name}
                                onClick={option.onClick}
                                className={`${optionsStyle} ${selectedIndex == index && isItemFocused ? 'bg-theme-bgNavigation' : ''}`}>
                                <Wrapper flow='row' wrap='no-wrap' key={index}>
                                    {option.icon} {option.name}
                                </Wrapper>
                                <span className='text-xs'>{option.key}</span>
                            </h1>
                        ))
                    }
                </DropDownContent>
            </DropDownMenu>
            <h1 className='text-theme-textPrimary text-xl mb-1 uppercase'>Task Flow</h1>            
        </Container>
    )
}