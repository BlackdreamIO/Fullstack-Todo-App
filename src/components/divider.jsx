import cn from '@/utils/utis';
import React, { forwardRef } from 'react'

export const Divider = forwardRef(({className, ...rest}, ref ) => {
    
    const defaultStyle = `dark:bg-white h-[2px] w-full`;

    return (
        <div ref={ref} className={cn(defaultStyle, className)} {...rest}>

        </div>
    )
})
