import React, { forwardRef } from 'react'

export const ContextMenuHeader = forwardRef(({children, onContextMenu, className, ...rest}, ref) => {
    return (
        <div onContextMenu={onContextMenu} className={className} ref={ref} {...rest}>
            {children}
        </div>
    )
})
