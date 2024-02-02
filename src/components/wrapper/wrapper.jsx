import cn from "../../utils/utis";

export const Wrapper = ({flow='row', wrap='wrap', alignItem='center', justifyItem='center', className, children, ...rest}) => {

    const defaultStyle = `flex flex-${flow} flex-${wrap} gap-2 items-${alignItem} justify-${justifyItem}`

    return (
        <div className={cn(defaultStyle, className)} {...rest}>
            {children}
        </div>
    )  
} 