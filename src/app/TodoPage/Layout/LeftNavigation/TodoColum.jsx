import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { DropDownMenu, DropDownHeader, DropDownContent } from '../../../../components/dropDown/DropDown'
import { Button } from '../../../../components/cva/button/cvaButton'
import { ContextMenu } from '../../../../components/contextMenu/contextMenu';
import ContextMenuHeader from '../../../../components/contextMenu/contextMenuHeader';
import ContextMenuContent from '../../../../components/contextMenu/contextMenuContent';

export const TodoColumnItem = ({title, active=false, onClick}) => {

    const [openOptions, setOpenOptions] = useState(false);

    const handleClick = () => {
        if(onClick != null) {
            onClick();
            setOpenOptions(true);
        }
    }

    const ColStyle = `w-[95%] min-h-[40px] flex flex-row items-center justify-between px-2 pt-1 border-l-4 group rounded-lg cursor-default transition-all duration-150
        ${active ? 'dark:bg-white bg-neutral-100 dark:border-neutral-500 border-indigo-500' : 'dark:bg-transparent dark:border-transparent'}`

    const titleStyle = `mb-1 font-sans font-bold text-[0.9rem] ${active ? 'dark:text-black text-black' : 'text-neutral-500 group-hover:text-neutral-200'}`


    const dropdownContent = () => {
        return (
            openOptions && (
                <Button>Delete This List</Button>
                // <DropDownContent open={openOptions} className="left-5 z-[8000]">
                //     <Button>Delete This List</Button>
                // </DropDownContent>
            )
        )
    }

    return (
        <div className={ColStyle} onClick={() => handleClick()}>

            <h2 className={titleStyle}>
                {title}
            </h2>

            <ContextMenu className='dark:bg-neutral-700'>
                <ContextMenuHeader>
                    <h1>RIGHT</h1>
                </ContextMenuHeader>
                <ContextMenuContent className='absolute left-5 w-[400px] dark:bg-[aquamarine]'>
                    <DropDownMenu isOpen={true}>
                        <DropDownHeader>
                            <IoEllipsisVerticalSharp className={`${active ? 'dark:text-black' : 'dark:text-neutral-600'} cursor-pointer`} />
                        </DropDownHeader>
                        <DropDownContent open={true} className="relative z-[8000] w-[20%] flex flex-col items-center justify-center">
                            {/* {createPortal(<Button>Delete This List</Button>, document.body)} */}
                            <Button>Delete This List</Button>
                        </DropDownContent>
                    </DropDownMenu>
                </ContextMenuContent>
            </ContextMenu>

            <DropDownMenu isOpen={openOptions} onClose={() => setOpenOptions(false)}>
                <DropDownHeader>
                    <IoEllipsisVerticalSharp className={`${active ? 'dark:text-black' : 'dark:text-neutral-600'} cursor-pointer`} />
                </DropDownHeader>
                <DropDownContent open={openOptions} className="fixed left-40 z-[8000] w-[20%] flex flex-col items-center justify-center">
                    {/* {createPortal(<Button>Delete This List</Button>, document.body)} */}
                    <Button>Delete This List</Button>
                </DropDownContent>
            </DropDownMenu>
        </div>
    )
}