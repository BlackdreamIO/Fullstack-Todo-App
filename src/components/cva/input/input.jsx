import { forwardRef } from "react";
import { cva } from 'class-variance-authority'
import cn from "@/utils/utis";

const InputVarient = cva(
    "w-11/12 py-1 px-2 rounded-md outline-none focus:outline-none",
    {
        variants: {
            intent: {
                primary:
                    "bg-neutral-900 hover:bg-neutral-900 text-theme-textPrimary placeholder:text-theme-textTertiary",
                secondary : 
                    "bg-neutral-950 hover:bg-neutral-900 text-theme-textSecondary hover:text-theme-textPrimary",
                ghost:
                    `bg-transparent hover:bg-theme-bgSecondaryLight
                    text-theme-textPrimary placeholder:text-neutral-600`,
                transparent:
                    "bg-transparent text-theme-textPrimary placeholder:text-neutral-600",
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
                on : ['border-regulerBorder', 'border-theme-borderSecondary'],
                off : ['border-[1px]', 'border-none', 'border-none'],
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
    
    return (
        <input
            ref={ref}
            className={cn(InputVarient({ intent, size, fontWeight, width, outline }), className)}
            {...rest}
        />
    )
})
