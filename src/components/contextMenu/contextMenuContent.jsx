import cn from "@/utils/utis"
import { forwardRef } from "react"

export const ContextMenuContent = forwardRef(({ children, className }, ref) => {
    
    const defaultClassName = `w-[200px] bg-theme-bgPrimary p-2 border border-theme-borderSecondary`;
    
    return (
        <div className={cn(defaultClassName, className)} ref={ref}>
            {children}
        </div>
    )
})