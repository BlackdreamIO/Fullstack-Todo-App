import React from "react";
import { Button } from '../cva/button/cvaButton'

export function ConfirmationFooter({children, OnConfirm, OnCancell}) 
{
    const handleFooterRender = () => {
        if(React.Children.count(children) < 1) 
        {
            return (
                <div className='flex flex-row justify-end space-x-3 mt-2 w-full p-1 max-[500px]:flex-col max-[500px]:space-x-0
                    max-[500px]:space-y-3'>
                    <Button className='w-3/12 max-[500px]:w-full' onClick={OnConfirm}>Confirm</Button>
                    <Button className='w-3/12 max-[500px]:w-full' onClick={OnCancell}>Cancell</Button>
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
