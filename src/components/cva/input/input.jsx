import { forwardRef } from "react";
import { cva } from 'class-variance-authority'
import cn from "@/utils/utis";

const InputVarient = cva(
        "w-11/12 py-1 px-2 rounded-md",
    {
        variants: {
            intent: {
                primary:
                    "dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-600",
                secondary : 
                    "dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:text-neutral-500 dark:hover:text-white",
                ghost:
                    `bg-transparent hover:bg-neutral-200 dark:bg-transparent dark:hover:bg-neutral-900
                    dark:text-white text-black dark:placeholder:text-neutral-600`,
                transparent:
                    "bg-transparent dark:bg-transparent dark:text-white  text-black dark:placeholder:text-neutral-600",
            },
            width : {
                small : ['w-auto'],
                medium : ['w-[150px]'],
                large : ['w-[300px]'],
                full : ['w-full'],
            },
            fontSize : {
                verySmall : ['text-sx'],
                small : ['text-sm'],
                medium : ['text-md'],
                large : ['text-lg'],
                veryLarge : ['text-2xl']
            },
            outline : {
                on : ['border-[1px]', 'dark:border-neutral-800', 'border-white'],
                off : ['border-[1px]', 'dark:border-none', 'border-none'],
            },
        },
        defaultVariants: {
            intent: "primary",
            width : 'medium',
            size: "small",
            fontWeight : "normal",
            outline : 'on',
        },
    }
)

export const Input = forwardRef((
    {intent, size, fontWeight, width, outline, className, ...rest}, ref) => {
    
    const inputStyle = `dark:bg-neutral-950 w-11/12 dark:text-white px-3 py-1 rounded-md dark:outline-none
        dark:border-neutral-700 border-[1px] dark:placeholder:text-neutral-600`

    return (
        <input
            ref={ref}
            className={cn(InputVarient({ intent, size, fontWeight, width, outline }), className)}
            {...rest}
        />
    )
})
