import { useKeyboardNavigationContext } from '@/contextAPI/KeybaordNavigationContextAPI';
import { useState, useEffect } from 'react';

import { Button } from '@/components/cva/button/cvaButton';
import { Dialog, DialogContent } from '@/components/dialog/DialogComponent';
import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Wrapper } from '@/components/wrapper/wrapper';

export default function KeybaordNavigationInfo() 
{
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('noName');

    const keyboardNavigationContext = useKeyboardNavigationContext(); // { stopTrigger, setKeybaordNavigationEnabled }
    const keyboardNavigationContextStopTrigger = keyboardNavigationContext?.stopTrigger;

    const handleDialogOpen = () => {
        keyboardNavigationContext.handleEnableKeybaordNavigation()
    }

    const handleDialogClose = () => {
        setShow(false);
    }

    useEffect(() => {
        setShow(keyboardNavigationContextStopTrigger);
    }, [keyboardNavigationContextStopTrigger])
    

    return (
        <Dialog open={show}>
            <DialogContent 
                isOpen={show}
                onClose={() => setShow(false)}
                className='bg-theme-bgSecondary  p-2 max-w-screen-xl max-lg:w-[600px] max-[585px]:w-11/12 w-[700px] space-y-5
                border-4 border-theme-borderNavigation rounded-tenpixel z-[5000]' 
                overlayClassName=''>

                <Wrapper flow='col' wrap='no-wrap' alignItem='center' justifyItem='center' className='w-full space-y-4'>
                    <Typography variant={'h1'} >
                        SWITCH TO KEYBOARD MODE ?
                    </Typography>
                    <Typography variant={'p'} className='text-center text-yellow-300'>
                        we detected that you pressed tab key more then once. You can navigate this app with your tab 
                        and arrow keys but there are some extra key combination that you can checkout in the settings
                    </Typography>
                    <Typography variant={'p'} className='text-theme-textTertiary'>
                        to enable this feature letter in your settings {'>'} keybaord {'>'} {`[ENABLE KEYBAORD NAVIGATION]`}
                    </Typography>
                </Wrapper>
                <Wrapper wrap='no-wrap' alignItem='center' justifyItem='end'>
                    <Button onClick={handleDialogOpen}>Enable</Button>
                    <Button onClick={handleDialogClose}>Cancell</Button>
                </Wrapper>
            </DialogContent>
        </Dialog>
    )
}
