import { useState, useEffect  } from 'react';
import { IoSettingsOutline } from "react-icons/io5";

import { Button, buttonVarient } from '../../../../components/button/button';
import { Dialog, DialogContent } from '../../../../components/dialog/DialogComponent';

import {  Tabs, TabTrigger, TabContent, TabTriggerList, TabContentList } from '../../../../components/tabs/TabsComponent';

export default function ProfileSection() 
{
    const [openSetting, setOpenSetting] = useState(false);

    const profilePicUrl = `https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/333739394/original/8a4daaeb4e10a5fc1c95359d43d4528f3bb30219/design-a-logo-of-all-kinds-which-will-fascinate-public-toward-your-business.jpeg`

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
                    varient={buttonVarient.ghost}>
                        <IoSettingsOutline />
                    </Button>
                </div>
                <Dialog open={true}>
                    <DialogContent isOpen={openSetting} onClose={() => setOpenSetting(false)}>
                        <div className='w-[800px] h-[500px] m-auto dark:bg-neutral-950 rounded-lg'>
                           <Tabs>
                                <TabTriggerList>
                                    <TabTrigger value="tabOne">Tab One</TabTrigger>
                                    <TabTrigger value="tabTwo">Tab Two</TabTrigger>
                                    <TabTrigger value="tabThree">Tab Three</TabTrigger>
                                </TabTriggerList>
                                <TabContentList>
                                    <TabContent value="tabOne">Content for Tab One</TabContent>
                                    <TabContent value="tabTwo">Content for Tab Two</TabContent>
                                    <TabContent value="tabThree">Content for Tab Three</TabContent>
                                </TabContentList>
                            </Tabs>
                        </div>
                    </DialogContent>
                </Dialog>
            </ul>
        </section>
    )
}
