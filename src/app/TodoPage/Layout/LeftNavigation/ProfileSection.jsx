import { useState, useEffect  } from 'react';
import { IoSettingsOutline } from "react-icons/io5";

import { Button } from '@/components/cva/button/cvaButton';
import { Dialog, DialogContent } from '@/components/dialog/DialogComponent';

import {  Tabs, TabTrigger, TabContent, TabTriggerList, TabContentList } from '@/components/tabs/TabsComponent';
import { GeneralSetting } from './Settings/GeneralSetting';
import { AccountSetting } from './Settings/AccountSetting';

export default function ProfileSection() 
{
    const [openSetting, setOpenSetting] = useState(false);

    const profilePicUrl = `https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/333739394/original/8a4daaeb4e10a5fc1c95359d43d4528f3bb30219/design-a-logo-of-all-kinds-which-will-fascinate-public-toward-your-business.jpeg`

    const tabTriggerStyle = `dark:text-neutral-600 dark:hover:text-neutral-200 dark:hover:bg-neutral-700`

    return (
        <section className='dark:bg-black h-[7vh] max-h-[8vh] w-full '>
            <ul className='flex flex-row items-center justify-center gap-2 h-auto w-full'>
                <div className='flex flex-row items-center justify-center dark:bg-black w-10/12 h-full pl-2 pr-2 pt-1 pb-1'>
                    <img
                        className='w-[50px] rounded-[50%] border-[2px] dark:border-green-300' 
                        src={profilePicUrl} 
                        alt={`${profilePicUrl} not found`} 
                    />
                    <div className='w-full ml-2'>
                        <h1 className='dark:text-white'>Blackdream</h1>
                    </div>
                </div>
                <div className='w-2/12 flex items-center justify-center'>
                    <Button className='w-auto text-2xl text-center p-0 dark:text-neutral-500 dark:hover:text-white
                    text-neutral-500 hover:text-white' 
                    intent='ghost'
                    onClick={() => setOpenSetting(true)}>
                        <IoSettingsOutline />
                    </Button>
                </div>
                <Dialog open={openSetting}>
                    <DialogContent className='w-full' isOpen={openSetting} onClose={() => setOpenSetting(false)}>
                           <Tabs className='w-[95vw] max-w-[950px]' defaultTab={'general'}>
                                <TabTriggerList className='w-full dark:bg-neutral-900'>
                                    <TabTrigger value="general">General</TabTrigger>
                                    <TabTrigger value="account">Account</TabTrigger>
                                    <TabTrigger value="personalization">Personalization</TabTrigger>
                                    <TabTrigger value="notification">Notification</TabTrigger>
                                    <TabTrigger value="sound">Sound</TabTrigger>
                                </TabTriggerList>
                                <TabContentList>
                                    <TabContent value="general" className='dark:text-white'><GeneralSetting/></TabContent>
                                    <TabContent value="account" className='dark:text-white'><AccountSetting/></TabContent>
                                    <TabContent value="personalization" className='dark:text-white'>Content for Tab Three</TabContent>
                                    <TabContent value="notification" className='dark:text-white'>Content for Tab Four</TabContent>
                                    <TabContent value="sound" className='dark:text-white'>Content for Tab Five</TabContent>
                                </TabContentList>
                            </Tabs>
                    </DialogContent>
                </Dialog>
            </ul>
        </section>
    )
}
