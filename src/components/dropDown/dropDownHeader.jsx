import { forwardRef } from "react";
import cn from "@/utils/utis";

export const DropDownHeader = forwardRef(({ children, className, ...rest }, ref) => {
    const defaultStyle = `flex flex-col items-center justify-center space-y-1 w-full`
    return <div className={cn(defaultStyle, className)} ref={ref} {...rest}>{children}</div>;
})