import React from 'react'

export default function ContextMenuHeader({children, onContextMenu, className, ...rest}) 
{
    return (
        <div onContextMenu={onContextMenu} className={className} {...rest}>
            {children}
        </div>
    )
}
