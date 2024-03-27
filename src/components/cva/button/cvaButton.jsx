import { forwardRef } from "react";
import { cva } from 'class-variance-authority'
import cn from "@/utils/utis";

const ButtonVariants = cva(
    /* button base style */
    `w-[150px] h-fit text-center transition-colors duration-150 flex flex-row items-center justify-center gap-2 focus-visible:outline-blue-400
    `,
    {
        variants: {
            intent: {
                primary:
                    "bg-neutral-100 hover:bg-neutral-300 text-black",
                secondary : 
                    "bg-neutral-950 hover:bg-neutral-900 text-theme-textTertiary hover:text-theme-textPrimary",
                secondaryError : 
                    "bg-red-900 hover:bg-red-800 text-theme-textPrimary",
                error:
                    "bg-red-500 hover:bg-red-600",
                sucess:
                    "bg-green-500 hover:bg-green-600",
                ghost:
                    `bg-transparent hover:bg-neutral-200
                    text-theme-textTertiary hover:text-theme-textPrimary`,
                transparent:
                    "bg-transparent text-theme-textTertiary hover:text-theme-textPrimary",
                odd : 
                    "bg-blue-500 text-neutral-400 hover:text-theme-textPrimary"
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
                on : ['border-[1px]', 'border-neutral-900', 'focus-visible:border-theme-borderNavigation'],
                off : ['border-[1px]', 'border-none'],
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
                    loading == true ? ( <p className="text-theme-textPrimary"> {loadingText} </p> )
                    : ( <> {children} </> )
                }
        </button>
    )
})