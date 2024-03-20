import { forwardRef } from "react"
import cn from "../../utils/utis"

export const DropDownContent = forwardRef(({children, className='', open=false, ...rest}, ref) => {

    const defaultStyle = `dark:bg-black w-auto h-auto absolute right-0 dark:text-black m-2 p-2
        rounded-[5px] shadow-[5px_5px_20px_5px_rgb(0,0,0,1)] dark:border-neutral-700 border-black 
        border-[1px] space-y-2`

    return (
        <div className={cn(defaultStyle, className)} style={{display : open ? 'block': 'none'}} ref={ref} {...rest}>
            {children}
        </div>
    )
})
