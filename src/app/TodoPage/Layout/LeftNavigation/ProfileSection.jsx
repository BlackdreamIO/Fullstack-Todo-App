import { useState, useEffect  } from 'react';
import { IoSettingsOutline } from "react-icons/io5";

import { Button, buttonVarient } from '../../../../components/button/button';
import { Dialog, DialogContent } from '../../../../components/dialog/DialogComponent';

import {  Tabs, TabTrigger, TabContent, TabTriggerList, TabContentList } from '../../../../components/tabs/TabsComponent';

export default function ProfileSection() 
{
    const [openSetting, setOpenSetting] = useState(false);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const profilePicUrl = `https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/333739394/original/8a4daaeb4e10a5fc1c95359d43d4528f3bb30219/design-a-logo-of-all-kinds-which-will-fascinate-public-toward-your-business.jpeg`

    const tabTriggerStyle = `dark:text-neutral-500 dark:hover:text-neutral-200 dark:hover:bg-neutral-700`

    return (
        <section className='dark:bg-black max-h-[10vh] w-full'>
            <ul className='flex flex-row items-center justify-center gap-2 h-auto'>
                <div className='flex flex-row items-center justify-center dark:bg-black w-10/12 h-full pl-2 pr-2 pt-1 pb-1'>
                    <img
                        className='w-[50px] rounded-[50%] border-[2px] dark:border-green-300' 
                        src={profilePicUrl} 
                        alt={`${profilePicUrl} not found`} 
                    />
                    <div className='w-full ml-2'>
                        <h1 className='dark:text-white'>Blackdream io intersect observer</h1>
                    </div>
                </div>
                <div className='w-2/12 flex items-center justify-center'>
                    <Button className='w-auto text-2xl text-center p-0 dark:text-neutral-500 dark:hover:text-white
                    text-neutral-500 hover:text-white' 
                    varient={buttonVarient.ghost}
                    onClick={() => setOpenSetting(true)}>
                        <IoSettingsOutline />
                    </Button>
                </div>
                <Dialog open={openSetting}>
                    <DialogContent isOpen={openSetting} onClose={() => setOpenSetting(false)}>
                        <div className='w-[950px] h-[500px] m-auto dark:bg-neutral-950 rounded-lg p-2'>
                           <Tabs defaultTab={'tabOne'}>
                                <TabTriggerList>
                                    <TabTrigger className={tabTriggerStyle} value="tabOne">General</TabTrigger>
                                    <TabTrigger className={tabTriggerStyle} value="tabTwo">Account</TabTrigger>
                                    <TabTrigger className={tabTriggerStyle} value="tabThree">Personilazation</TabTrigger>
                                    <TabTrigger className={tabTriggerStyle} value="tabThree">Notification</TabTrigger>
                                    <TabTrigger className={tabTriggerStyle} value="tabThree">Sound</TabTrigger>
                                </TabTriggerList>
                                <TabContentList>
                                    <TabContent value="tabOne" className='dark:text-white'>Content for Tab One</TabContent>
                                    <TabContent value="tabTwo" className='dark:text-white'>Content for Tab Two</TabContent>
                                    <TabContent value="tabThree" className='dark:text-white'>Content for Tab Three</TabContent>
                                </TabContentList>
                            </Tabs>
                        </div>
                    </DialogContent>
                </Dialog>
            </ul>
        </section>
    )
}
