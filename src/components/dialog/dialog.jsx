import React from 'react';
import { createPortal } from 'react-dom';

export function Dialog({children, open}) 
{
    return createPortal(
        <div className='w-full'>
            {
                open && (
                    <div>
                        {children}
                    </div>
                )
            }
        </div>, document.body
    )
}
