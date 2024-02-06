import cn from "@/utils/utis"

export function ContextMenuContent({children, showContextMenu=false, className, ...rest}) 
{

    return (
        <div className={cn('',className)} style={{ display : showContextMenu ? 'block' : 'none' }} {...rest}>
            {children}
        </div>
    )
}
