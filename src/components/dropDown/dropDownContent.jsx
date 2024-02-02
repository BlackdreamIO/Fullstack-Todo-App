import cn from "../../utils/utis"

export const DropDownContent = ({children, className='', open=false}) => {

    const defaultStyle = `dark:bg-black w-auto h-auto absolute right-0 dark:text-black m-2 p-2
        rounded-[5px] z-20 shadow-[5px_5px_20px_5px_rgb(0,0,0,1)] dark:border-neutral-700 border-black 
        border-[1px] space-y-2`

    return (
        <div className={cn(defaultStyle, className)} style={{display : open ? 'block': 'none'}}>
            {children}
        </div>
    )
}
