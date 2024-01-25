
export const buttonVarient = {
    primary : `dark:bg-neutral-200 dark:hover:bg-neutral-300 bg-neutral-100 hover:bg-neutral-300 
        dark:text-black w-full rounded-md font-bold font-robotoReguler text-sm pt-1 pb-1`,

    secondary : `dark:bg-[#21232C] dark:hover:bg-[#242633] bg-green-500 hover:bg-green-700 
        dark:text-white w-full rounded-md font-bold font-robotoReguler text-sm pt-1 pb-1`,

    sucess : `dark:bg-green-600 dark:hover:bg-green-700 bg-green-500 hover:bg-green-700 dark:text-white 
        w-full rounded-md font-bold font-robotoReguler text-sm pt-1 pb-1`,

    error : `dark:bg-red-600 dark:hover:bg-red-700 bg-green-500 hover:bg-green-700 dark:text-white 
        w-full rounded-md font-bold font-robotoReguler text-sm pt-1 pb-1`,
    
    ghost : `dark:bg-transparent dark:hover:bg-transparent bg-transparent hover:transparent dark:text-white
        w-full rounded-md font-bold font-robotoReguler text-sm pt-1 pb-1`,
    
    outlined : `dark:bg-transparent dark:hover:bg-neutral-800 bg-transparent hover:transparent dark:text-white
        w-full rounded-md font-bold font-robotoReguler text-sm pt-1 pb-1`
}

export const Button = ({children, varient=buttonVarient.primary, ...rest}) => {

    return (
        <button
        className={varient} 
        {...rest}>
            {children}
        </button>
    )
}