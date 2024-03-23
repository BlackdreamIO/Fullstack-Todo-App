import cn from "@/utils/utis"
import { forwardRef } from "react"

export const ContextMenuContent = forwardRef(({ children, className, onEventEnd }, ref) => {
    
    const defaultClassName = `w-[200px] bg-theme-bgPrimary p-2 flex flex-col items-center justify-center border border-theme-borderSecondary rounded-md`;
    
    const handleOnEventEnd = () => {
        setTimeout(() => {
            if(onEventEnd != null) {
                onEventEnd();
            }
        }, 200);
    }

    return (
        <div className={cn(defaultClassName, className)} ref={ref} onClick={handleOnEventEnd}>
            {children}
        </div>
    )
})