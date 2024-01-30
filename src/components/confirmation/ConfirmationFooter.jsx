import React from "react";
import { Button, buttonVarient } from '../button/button'

export function ConfirmationFooter({children, OnConfirm, OnCancell}) 
{
    const handleFooterRender = () => {
        if(React.Children.count(children) < 1) 
        {
            return (
                <div className='flex flex-row justify-end space-x-3 mt-2 w-full p-1'>
                    <Button className='w-3/12' onClick={OnConfirm}>Confirm</Button>
                    <Button className='w-3/12' onClick={OnCancell}>Cancell</Button>
                </div>
            )
        }
        else {
            return children;
        }
    }

    return (
        <div>
            {handleFooterRender()}
        </div>
    )
}
