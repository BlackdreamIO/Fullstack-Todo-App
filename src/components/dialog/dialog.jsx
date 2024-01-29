import React from 'react';
import { createPortal } from 'react-dom';

export const Dialog = ({children, open}) => {
    return createPortal(
        <div className={`w-full ${open ? 'visible' : 'hidden'}`}>
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
