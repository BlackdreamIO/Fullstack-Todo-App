import { forwardRef } from "react";
import cn from "../../utils/utis";

export const Wrapper = forwardRef(({flow='row', wrap='no-wrap', alignItem='center', justifyItem='center', className, children, ...rest}, ref) => {

    const defaultStyle = `flex flex-${flow} flex-${wrap} gap-2 items-${alignItem} justify-${justifyItem}`

    return (
        <div className={cn(defaultStyle, className)} ref={ref} {...rest}>
            {children}
        </div>
    )  
})