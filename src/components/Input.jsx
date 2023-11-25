import React from "react";

export const Input = ({placeholder='', ...rest}) => {
    return (
        <input 
            className="dark:bg-neutral-900 dark:hover:bg-neutral-800 p-2 text-white 
                cursor-default dark:placeholder:text-neutral-500 rounded-sm h-[30px] font-mono
                mt-2 mb-2 border-[1px] dark:border-transparent dark:hover:border-green-300 
                focus:border-green-500 checked:border-green-500 outline-none" 
                type="text" placeholder={placeholder} {...rest}
        />
    )
}
