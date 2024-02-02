import React from 'react'

export default function ContextMenuContent({children, showContextMenu=false, className, ...rest}) 
{
    return (
        <div className={className} style={{display : showContextMenu ? 'block' : 'none'}} {...rest}>
            {children}
        </div>
    )
}
