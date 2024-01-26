import cn from "../../utils/utis"

const inputVarient = {
    primary : ``,
    outlined : ''
}

export const Input = ({className='', Varient=inputVarient.primary, higlight=false, ...rest}) => {
    const defaultStyle = `dark:bg-neutral-950 w-full h-auto dark:text-white 
        dark:placeholder:text-neutral-700 placeholder:text-neutral-800 shadow-md 
        dark:shadow-neutral-900 shadow-neutral-400 hover:shadow-none border-[1px] 
        dark:border-neutral-900 border-neutral-200 dark:hover:border-neutral-500 
        hover:border-neutral-500 dark:focus:border-blue-500 focus:border-blue-500 
        dark:checked:border-blue-500 checked:border-blue-500 active:border-blue-500 
        dark:active:border-blue-500 dark:outline-none outline-none p-2 pl-3 rounded-lg 
        ${higlight ? 'dark:border-green-500 border-green-500' : ''}`

    return (
        <input
            className={cn(defaultStyle, className)}
            {...rest}
        />
    )
}