import { useState, useEffect } from 'react';

import { IoEllipsisVerticalSharp } from "react-icons/io5";

import { DropDownMenu, DropDownHeader, DropDownContent } from 'components/dropDown/DropDown'
import { Button } from 'components/cva/button/cvaButton'
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from 'components/contextMenu/contextMenuComponent';
import { Container } from 'components/container/container';

export const TodoColumnItem = ({title, active=false, onClick}) => {

    const [openOptions, setOpenOptions] = useState(false);

    const handleClick = () => {
        if(onClick != null) {
            onClick();
            setOpenOptions(true);
        }
    }

    const ColStyle = `w-[95%] min-h-[40px] px-2 pt-1 border-l-4 group rounded-lg cursor-default transition-all duration-150
        ${active ? 'dark:bg-white bg-neutral-100 dark:border-neutral-500 border-indigo-500' : 'dark:bg-transparent dark:border-transparent'}`

    const titleStyle = `mb-1 font-sans font-bold text-[0.9rem] ${active ? 'dark:text-black text-black' : 'text-neutral-500 group-hover:text-neutral-200'}`

    return (
        <ContextMenu className={'w-full'}>

            <ContextMenuHeader className={'w-full'}>
                <Container wrap='no-wrap' flow='row' justifyItem='between' className={ColStyle} onClick={() => handleClick()}>

                    <h2 className={titleStyle}>
                        {title}
                    </h2>
                    <DropDownMenu isOpen={openOptions} onClose={() => setOpenOptions(false)}>
                        <DropDownHeader>
                            <IoEllipsisVerticalSharp className={`${active ? 'dark:text-black' : 'dark:text-neutral-600'} cursor-pointer`} />
                        </DropDownHeader>
                        <DropDownContent open={openOptions} className="fixed left-40 z-[8000] w-[20%] flex flex-col items-center justify-center">
                            <Button>Delete This List</Button>
                        </DropDownContent>
                    </DropDownMenu>
                </Container>
            </ContextMenuHeader>

            <ContextMenuContent className='absolute left-40 z-[2000] w-auto'>
                <DropDownMenu isOpen={true}>
                    <DropDownContent open={true} className="relative z-[8000] flex flex-col items-center justify-center">
                        <Button>Delete This List</Button>
                    </DropDownContent>
                </DropDownMenu>
            </ContextMenuContent>

        </ContextMenu>
    )
}