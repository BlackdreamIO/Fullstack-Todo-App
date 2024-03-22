import { useState, useEffect, useRef} from "react";

import { MorphicElement } from "@/components/morphicElement"
import { Typography } from "@/components/typography/typohgraphy";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Divider } from "@/components/divider";
import { Button } from "@/components/cva/button/cvaButton";
import { DropDownContent, DropDownMenu } from "@/components/dropDown/DropDown";
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from "@/components/contextMenu/contextMenuComponent";

import { IoMdArrowDropdown } from "react-icons/io";
import { BsMouse } from "react-icons/bs";


export default function CompleteSection({ onMinimize, isMinimized=false, children }) 
{
    const [contextContentSizeProperty, setContextContentSizeProperty] = useState({x : 250, y : 100});
    const contextContentRef = useRef(null);

    const handleOnMinimize = () => {
        if(onMinimize != null) onMinimize();
    }

    useEffect(() => {
        if(contextContentRef.current) {
            const contextContentWidth = contextContentRef.current.offsetWidth + 150;
            const contextContentHeight = contextContentRef.current.offseHeight;
            setContextContentSizeProperty({ x : contextContentWidth, y : contextContentHeight })
        }
    }, [contextContentRef.current])

    const contextHeader = () => {
        return (
            <Wrapper flow='row' wrap='no-wrap' alignItem='center' justifyItem='between' className='w-full pr-2 pointer-events-none'>
                <Typography variant={'h2'}>Complete</Typography>
                <IoMdArrowDropdown 
                    size='2rem'
                    className='text-theme-textPrimary hover:bg-theme-hoverBgTertiary p-1 rounded-xl pointer-events-auto' 
                    onClick={() => handleOnMinimize()}
                    style={{transform : `rotate(${isMinimized ? 180 : 0}deg)`}}
                />
            </Wrapper>
        )
    }

    return (
        <MorphicElement className='flex flex-row flex-wrap items-center justify-start gap-2 w-full'>
            
            <ContextMenu contextContentSize={contextContentSizeProperty} className='w-full'>
                <ContextMenuHeader>
                   {contextHeader()}
                </ContextMenuHeader>
                <ContextMenuContent className='w-[170px] h-auto' ref={contextContentRef}>
                    <Button>Click To Open</Button>
                    <Button>Click To Open</Button>
                    <DropDownMenu className='w-full' isOpen>
                        <DropDownContent className='bg-theme-bgTertiary h-[100px] bottom-10 right-20' open>
                            <Button>Magic</Button>
                        </DropDownContent>
                    </DropDownMenu>
                </ContextMenuContent>
            </ContextMenu>
            <Divider className='bg-theme-borderPrimary'/>

            <MorphicElement style={{
                    height : isMinimized ? '0px' : 'auto',
                    transition : 'height 0.1s ease-out'
                }}
                element='ul'
                className='flex flex-col items-start justify-start w-full space-y-2 overflow-hidden'>
                {
                    children
                }
            </MorphicElement>
        </MorphicElement>
    )
}
