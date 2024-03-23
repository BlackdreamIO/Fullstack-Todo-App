import cn from "@/utils/utis"
import { forwardRef } from "react"

export const ContextMenuContent = forwardRef(({ children, className }, ref) => {
    
    const defaultClassName = `w-[200px] bg-theme-bgPrimary p-2 flex flex-col items-center justify-center border border-theme-borderSecondary rounded-md`;
    
    return (
        <div className={cn(defaultClassName, className)} ref={ref}>
            {children}
        </div>
    )
})