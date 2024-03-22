
import { MorphicElement } from "@/components/morphicElement"
import { Typography } from "@/components/typography/typohgraphy";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Divider } from "@/components/divider";
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

import { IoMdArrowDropdown } from "react-icons/io";
import { BsMouse } from "react-icons/bs";

export default function IncompleteSection({ onMinimize, isMinimized=false, children })
{
    return (
        <MorphicElement className='flex flex-row flex-wrap items-center justify-start gap-2 w-full'>
            <Wrapper flow='row' wrap='no-wrap' alignItem='center' justifyItem='between' className='w-full pr-2'>
                <Typography variant={'h2'}>Incomplete</Typography>

                <IoMdArrowDropdown 
                    size='2rem'
                    className='text-theme-textPrimary hover:bg-theme-hoverBgTertiary p-1 rounded-xl' 
                    onClick={() => onMinimize()}
                    style={{transform : `rotate(${isMinimized ? 180 : 0}deg)`}}
                />
            </Wrapper>
            <Divider className='bg-theme-borderPrimary'/>

            <MorphicElement 
                style={{
                    height : isMinimized ? '0px' : 'auto',
                    transition : 'height 0.1s ease-out'
                }} 
                element='ul' 
                className='flex flex-col items-start justify-start w-full space-y-2 overflow-hidden'>
                {children}
            </MorphicElement>
        </MorphicElement>
    )
}
