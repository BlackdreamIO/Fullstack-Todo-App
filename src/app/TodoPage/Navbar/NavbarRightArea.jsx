import { useState, Fragment } from 'react';

import { DropDownMenu, DropDownContent, DropDownHeader  } from '@/components/dropDown/DropDown';
import { Button } from '@/components/cva/button/cvaButton';
import { Container } from '@/components/container/container';

import { Dialog, DialogContent } from '@/components/dialog/DialogComponent';
import AuthMoadal from './AuthModal';

import dummyImage from '@/Assets/images/dummyImage.webp';
import loggedInUser from '@/Assets/images/loggedInUser.webp';

export const NavbarRightArea = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const [openDropDown, setOpenDropDown] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState(false);

    return (
        <DropDownMenu onClose={() => setOpenDropDown(false)} isOpen={openDropDown}>
            <DropDownHeader>
                {
                    isLoggedIn ? (
                        <Container 
                            wrap='no-wrap' 
                            className='dark:bg-black border-[1px] dark:border-neutral-700 dark:hover:bg-neutral-900 px-3 mr-2 w-auto rounded-lg
                            transition-all duration-150 cursor-pointer max-w-[200px] group' 
                            onClick={() => setOpenDropDown(!openDropDown)}>
                            <img 
                                className='w-[35px] h-[35px] p-2 dark:bg-black rounded-[50%]'
                                src={loggedInUser} 
                                alt="profile not found"
                            />
                            <h2 className='dark:text-neutral-500 text-center font-bold dark:group-hover:text-neutral-200 leading-tight'>Moamal Ala</h2>
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
            <DropDownContent className={`${isLoggedIn ? 'w-[100%]' : 'min-w-[205%]'}`} open={openDropDown}>
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
                <DialogContent isOpen={openAuthDialog} onClose={() => setOpenAuthDialog(false)}>
                    <AuthMoadal mode='SignUp' onCloseRequest={() => setOpenAuthDialog(false)}/>
                </DialogContent>
            </Dialog>
        </DropDownMenu>
    )
}
