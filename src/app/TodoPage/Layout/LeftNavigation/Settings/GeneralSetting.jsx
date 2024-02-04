import React, { useState } from 'react'

import { Button } from '@/components/cva/button/cvaButton';
import { DropDownMenu, DropDownHeader, DropDownContent } from '@/components/dropDown/DropDown';

export function GeneralSetting() 
{
    const [selectedLangauge, setSelectedLangauge] = useState('english');
    const [smartDateRecogniztion, setSmartDateRecogniztion] = useState(false);
    const [updateNotification, setUpdateNotification] = useState(true);

    const [openLangaugeDropdown, setOpenLangaugeDropdown] = useState(false);
    const [openSDR, setOpenSDR] = useState(false);
    const [openUpdateNotification, setOpenUpdateNotification] = useState(false);

    const handleLangauge = (lang) => {
        setSelectedLangauge(lang);
        setOpenLangaugeDropdown(false);
    }

    const handleSDR = (enbSDR) => {
        setSmartDateRecogniztion(enbSDR);
        setOpenSDR(false);
    }

    const handleUpdateNotification = (enableNoti) => {
        setUpdateNotification(enableNoti);
        setOpenUpdateNotification(false);
    }


    const LELS = `dark:text-white text-sm capitalize dark:hover:bg-blue-700 p-1 cursor-default`

    return (
        <section className='w-full h-auto mt-5'>
            <h1 className='dark:text-neutral-200 font-bold text-3xl'>General</h1>
            <div className='w-full mt-5 flex flex-col space-y-10'>
                
                <DropDownMenu onClose={() => setOpenLangaugeDropdown(false)} isOpen={openLangaugeDropdown} className='w-full'>
                    <DropDownHeader className='flex flex-col space-y-2'>
                        <h1 className='dark:text-neutral-200 font-bold'>Langauge</h1>
                        <Button onClick={() => setOpenLangaugeDropdown(true)} className='w-[20%] capitalize'>{selectedLangauge}</Button>
                    </DropDownHeader>
                    <DropDownContent className='left-2 shadow-none' open={openLangaugeDropdown}>
                        <p className={LELS} onClick={() => handleLangauge('english')}>english</p>
                        <p className={LELS} onClick={() => handleLangauge('spanish')}>spanish</p>
                        <p className={LELS} onClick={() => handleLangauge('arabic')}>arabic</p>
                    </DropDownContent>
                </DropDownMenu>

                <DropDownMenu onClose={() => setOpenSDR(false)} isOpen={openSDR} className='w-full'>
                    <DropDownHeader className='flex flex-col space-y-2'>
                        <h1 className='dark:text-neutral-200 font-bold'>Smart date recognition</h1>
                        <Button onClick={() => setOpenSDR(true)} className='w-[20%] capitalize'>{smartDateRecogniztion ? 'enabled' : 'disabled'}</Button>
                    </DropDownHeader>
                    <DropDownContent className='left-2 shadow-none' open={openSDR}>
                        <p className={LELS} onClick={() => handleSDR(true)}>Enable</p>
                        <p className={LELS} onClick={() => handleSDR(false)}>Disable</p>
                        <p className={LELS} onClick={() => handleSDR(true)}>Auto</p>
                    </DropDownContent>
                </DropDownMenu>

                <DropDownMenu onClose={() => setOpenUpdateNotification(false)} isOpen={openUpdateNotification} className='w-full'>
                    <DropDownHeader className='flex flex-col space-y-2'>
                        <h1 className='dark:text-neutral-200 font-bold'>Notify New Updates</h1>
                        <Button onClick={() => setOpenUpdateNotification(true)} className='w-[20%] capitalize'>{updateNotification ? 'enabled' : 'disabled'}</Button>
                    </DropDownHeader>
                    <DropDownContent className='left-2 shadow-none' open={openUpdateNotification}>
                        <p className={LELS} onClick={() => handleUpdateNotification(true)}>Yes I Want</p>
                        <p className={LELS} onClick={() => handleUpdateNotification(false)}>Nope</p>
                    </DropDownContent>
                </DropDownMenu>
            </div>
        </section>
    )
}
