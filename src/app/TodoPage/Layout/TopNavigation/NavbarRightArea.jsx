import { useState, Fragment } from 'react';

import { DropDownMenu, DropDownContent, DropDownHeader  } from '@/components/dropDown/DropDown';
import { Button } from '@/components/cva/button/cvaButton';
import { Container } from '@/components/container/container';

import { Dialog, DialogContent } from '@/components/dialog/DialogComponent';
import AuthMoadal from './AuthModal';

import dummyImage from '@/Assets/images/dummyImage.webp';
import loggedInUser from '@/Assets/images/loggedInUser.webp';

import { Typography } from '@/components/typography/typohgraphy';

export const NavbarRightArea = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [openDropDown, setOpenDropDown] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState(false);

    return (
        <DropDownMenu onClose={() => setOpenDropDown(false)} isOpen={openDropDown}>
            <DropDownHeader>
                {
                    isLoggedIn ? (
                        <Container 
                            wrap='no-wrap' 
                            className='dark-theme:bg-black border-[1px] dark-theme:border-neutral-700 dark-theme:hover:bg-neutral-900 px-3 mr-2 w-auto rounded-lg
                            transition-all duration-150 cursor-pointer max-w-[200px] group' 
                            onClick={() => setOpenDropDown(!openDropDown)}>
                            <img 
                                className='w-[35px] h-[35px] p-2 dark-theme:bg-black rounded-[50%]'
                                src={loggedInUser} 
                                alt="profile not found"
                            />
                            <h2 className='dark-theme:text-neutral-500 text-center font-bold dark:group-hover:text-neutral-200 leading-tight'>Moamal Ala</h2>
                        </Container>
                    )
                    : (
                        <Container onClick={() => setOpenDropDown(!openDropDown)}>
                            <img 
                                className='w-[45px] p-2 mr-5 rounded-[50%] border-[1px] border-black'
                                src={dummyImage}
                                alt="img not found"
                            />
                        </Container>
                    )
                }
            
            </DropDownHeader>
            
            <DropDownContent className={`${isLoggedIn ? 'w-[100%]' : 'min-w-[205%]'} bg-theme-bgPrimary`} open={openDropDown}>
                {
                    isLoggedIn ? (
                        <Fragment>
                            <Button intent={'primary'} size={'small'} onClick={() => alert("clicked")} >
                                Account Setting
                            </Button>
                            <Button intent={'error'} size={'small'} onClick={() => alert("clicked")} >
                                Log Out
                            </Button>
                        </Fragment>
                    )
                    : 
                    (
                        <Fragment>
                            <Button intent={'secondary'} size={'small'} onClick={() => alert("not logged in create")} >
                                Create Account
                            </Button>
                            <Button intent={'secondary'} size={'small'} onClick={() => setOpenAuthDialog(true)}>
                                Log In
                            </Button>
                        </Fragment>
                    )
                }
            </DropDownContent>
            
            <Dialog open={openAuthDialog}>
                <DialogContent overlayClassName={'backdrop-blur-[0px]'} isOpen={true} onClose={() => setOpenAuthDialog(false)}>
                    <AuthMoadal mode='SignUp' onCloseRequest={() => setOpenAuthDialog(false)}/>
                </DialogContent>
            </Dialog>

            {/* <div className="dark-theme:bg-theme-secondary light-theme:bg-theme-primary w-[500px] min-h-auto h-auto m-auto p-3 rounded-md flex flex-col">
                <Typography variant={'h1'}>Log the heck</Typography>
                <Button>Log Test</Button>
                <button className='dark-theme:bg-white dark-theme:text-black p-4'>test alaka</button>
            </div> */}
        </DropDownMenu>
    )
}
