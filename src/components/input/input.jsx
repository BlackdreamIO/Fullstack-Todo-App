import cn from "../../utils/utis"

export const Input = ({className='', ...rest}) => {
    return (
        <input
            className={cn(`dark:bg-neutral-900 w-full h-auto dark:text-white 
            dark:placeholder:text-white p-2 shadow-md shadow-neutral-950 border-[1px]
            dark:border-neutral-800 dark:hover:border-neutral-500 dark:focus:border-neutral-500
            dark:checked:border-neutral-500 dark:active:border-neutral-500 dark:outline-none`)}
            {...rest}
        />
    )
}