import { forwardRef } from "react";
import { cva } from 'class-variance-authority'
import cn from "@/utils/utis";

const ButtonVariants = cva(
    /* button base style */
    "w-[150px] h-fit dark-theme:text-white light-theme:text-black text-center transition-colors duration-150 flex flex-row items-center justify-center gap-2",
    {
        variants: {
            intent: {
                primary:
                    "dark-theme:bg-neutral-100 dark-theme:hover:bg-neutral-300 dark-theme:text-black",
                secondary : 
                    "dark-theme:bg-neutral-950 dark-theme:hover:bg-neutral-900 dark-theme:text-neutral-500 dark-theme:hover:text-white",
                secondaryError : 
                    "dark-theme:bg-red-900 dark-theme:hover:bg-red-800 dark-theme:text-white",
                error:
                    "bg-red-500 hover:bg-red-600",
                sucess:
                    "bg-green-500 hover:bg-green-600",
                ghost:
                    `bg-transparent hover:bg-neutral-200 dark-theme:bg-transparent dark-theme:hover:bg-neutral-800
                    dark-theme:text-neutral-500 dark-theme:hover:text-white text-neutral-500 hover:text-black`,
                transparent:
                    "bg-transparent dark-theme:bg-transparent dark-theme:text-neutral-500 dark-theme:hover:text-white text-neutral-500 hover:text-black",
                odd : 
                    "dark-theme:bg-blue-500 bg-blue-500 dark-theme:text-neutral-400 dark-theme:hover:text-white text-neutral-500 hover:text-black"
            },

            /* button sizes */
            size: {
                xs : ["text-xs", "py-1", "px-0"],
                small: ["text-sm", "py-1", "px-2"],
                normal: ["text-base", "py-1", "px-4"],
                medium: ["text-base", "py-2", "px-4"],
                large: ["text-lg", "py-4", "px-8"],
            },

            width : {
                xs : ['w-[40px]'],
                small : ['w-auto'],
                medium : ['w-[150px]'],
                large : ['w-[300px]'],
                full : ['w-full'],
            },

            fontWeight : {
                light : ['font-light'],
                normal : ['font-normal'],
                medium : ['font-medium'],
                bold : ['font-bold'],
            },

            /* button roundness */
            border: {
                none: "rounded-none",
                small: "rounded-sm",
                medium: "rounded-md",
                half : 'rounded-[50%]',
                large : "rounded-full",
            },

            outline : {
                on : ['border-[1px]', 'dark-theme:border-neutral-800', 'border-white'],
                off : ['border-[1px]', 'dark-theme:border-none', 'border-none'],
            },
        },

        // defaults
        defaultVariants: {
            intent: "primary",
            width : 'medium',
            size: "small",
            fontWeight : "normal",
            border: "medium",
            outline : 'on',
        },
    }
);


export const Button = forwardRef((
    { intent, size, fontWeight, width, border, children, outline, className, loading=false, loadingText='Loading...', ...rest }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(ButtonVariants({ intent, size, border, fontWeight, width, outline }), className)}
            disabled={loading}
            {...rest}>
                {
                    loading == true ? ( <p className="dark-theme:text-white "> {loadingText} </p> )
                    : ( <> {children} </> )
                }
        </button>
    )
})