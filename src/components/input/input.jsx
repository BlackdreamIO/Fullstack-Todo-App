import cn from "../../utils/utis"

const inputVarient = {
    primary : ``,
    outlined : ''
}

export const Input = ({className='', Varient=inputVarient.primary, higlight=false, ...rest}) => {
    const defaultStyle = `bg-neutral-950 w-full h-auto text-theme-textPrimary 
        placeholder:text-theme-textTertairy placeholder:text-neutral-800 shadow-md 
        border-[1px] border-theme-borderSecondary hover:border-neutral-500 
        hover:border-neutral-500 focus:border-blue-500 focus:border-blue-500 
        checked:border-blue-500 checked:border-blue-500 active:border-blue-500 
        active:border-blue-500 outline-none outline-none p-2 pl-3 rounded-lg 
        ${higlight ? 'border-green-500 border-green-500' : ''}`

    return (
        <input
            className={cn(defaultStyle, className)}
            {...rest}
        />
    )
}