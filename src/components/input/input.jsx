import cn from "../../utils/utis"

const inputVarient = {
    primary : ``,
    outlined : ''
}

export const Input = ({className='', Varient=inputVarient.primary, ...rest}) => {
    return (
        <input
            className={cn(`dark:bg-neutral-950 w-full h-auto dark:text-white 
            dark:placeholder:text-neutral-700 p-2 pl-3 shadow-md rounded-lg shadow-neutral-900 border-[1px]
            dark:border-neutral-900 dark:hover:border-neutral-500 dark:focus:border-blue-500
            dark:checked:border-blue-500 dark:active:border-blue-500 dark:outline-none`, className)}
            {...rest}
        />
    )
}