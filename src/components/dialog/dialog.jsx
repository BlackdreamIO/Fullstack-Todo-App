import React from 'react';
import { createPortal } from 'react-dom';
import DialogContent from './dialogContent';

export default function Dialog() 
{
    return createPortal(
        <div>
            <DialogContent />
        </div>, document.body
    )
}
