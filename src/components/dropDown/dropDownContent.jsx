import { forwardRef } from "react"
import cn from "../../utils/utis"

export const DropDownContent = forwardRef(({children, className='', open=false, ...rest}, ref) => {

    const defaultStyle = `bg-theme-bgPrimary border border-theme-borderSecondary w-auto h-auto absolute right-0 m-2 p-2
        rounded-[5px] shadow-[5px_5px_20px_5px_rgb(0,0,0,1)] space-y-2 pointer-events-auto `

    return (
        <div className={cn(defaultStyle, className)} style={{display : open ? 'block': 'none'}} ref={ref} {...rest}>
            {children}
        </div>
    )
})
