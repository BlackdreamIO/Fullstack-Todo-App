import cn from "@/utils/utis";


export default function Textarea({
    resizeable = true,
    className,
    ...rest
}) 
{
    const defaultClassname = `w-full bg-theme-bgSecondary outline-none p-2 rounded-xl 
        placeholder:text-theme-textTertiary text-theme-textPrimary min-h-[200px] border-[1px]
        border-theme-borderSecondary
        resize-${resizeable ? 'resize' : 'resize-none'}`

    return (
        <textarea 
            className={cn(defaultClassname, className)} 
            {...rest}>
        </textarea>
    )
}
