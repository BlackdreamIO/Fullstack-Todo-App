import cn from "@/utils/utis"
import { forwardRef } from "react"

export const ContextMenuContent = forwardRef(({children, showContextMenu=false, className, ...rest}, ref) => {
    return (
        <div className={cn('',className)} style={{ display : showContextMenu ? 'block' : 'none' }} ref={ref} {...rest}>
            {children}
        </div>
    )
})
