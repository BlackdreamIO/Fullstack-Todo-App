import React from "react";

export const Button = ({text, useTransition=true, ...props}) => {
    return (
        <button 
            className={`dark:bg-black dark:hover:bg-white m-1 pl-2 pr-2 pt-1 pb-1 dark:text-white
            dark:hover:text-black font-mono rounded-[10px] w-5/12
            border-[1px] border-neutral-800 ${useTransition ? 'transition-all' : 'transition-none'}`} 
            {...props}> {text}
        </button>
    )
}
