import { useEffect, useState, Fragment, memo } from 'react';
import { createPortal } from 'react-dom';

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";

import { Input } from '@/components/cva/input/input';
import { Button } from '@/components/cva/button/cvaButton';
import { Container } from '@/components/container/container';
import { DropDownMenu, DropDownHeader, DropDownContent } from '@/components/dropDown/DropDown';
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from '@/components/contextMenu/contextMenuComponent';
import { Confirmation, ConfirmationHeader, ConfirmationFooter } from '@/components/confirmation/ConfirmationComponent';

export const TodoColumnItem = memo(({title, active=false, onClick}) => {

    const [openOptions, setOpenOptions] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [renamedText, setRenamedText] = useState('');

    const handleClick = () => {
        if(onClick != null) {
            onClick();
            setOpenOptions(true);
        }
    }

    const handleCursorPosition = () => {

    }

    const ColStyle = `w-[95%] min-h-[40px] px-2 pt-1 border-l-4 group rounded-lg cursor-default transition-all duration-150
        ${active ? 'dark:bg-white bg-neutral-100 dark:border-neutral-500 border-indigo-500' : 'dark:bg-transparent dark:border-transparent'}`

    const titleStyle = `mb-1 font-sans font-bold text-[0.9rem] ${active ? 'dark:text-black text-black' : 'text-neutral-500 group-hover:text-neutral-200'}`

    const DropDownMenuContents = () => {
        return (
            <Fragment>
                <Input width='full' value={renamedText} onChange={(e) => setRenamedText(e.target.value)} placeholder='text'/>
                <Button width='full' intent='primary'>Rename</Button>
                <Button onClick={() => setOpenConfirmation(true)} width='full' intent='error'><CiTrash /> Delete This List</Button>
            </Fragment>
        )
    }

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleEventClick = (e) => {
        console.log('ORIGINAL : ', e.clientY, ' CALCULATED : ', getCalculatedPosition(e.clientX, e.clientY));
        setPosition({ x: e.clientX, y: getCalculatedPosition(e.clientX, e.clientY) });
    } 

    const getCalculatedPosition = (x, y) => {
        if(y < 375) 
        {
            return y;
        }
        return y - 100;
    }

    useEffect(() => {
        const handleResize = () => {
            // Adjust position if it exceeds viewport bounds
            if (position.y + 100 > window.innerHeight) 
            {
                setPosition((prevPosition) => ({ ...prevPosition, y: window.innerHeight - 100 }));
            }
            if (position.x + 100 > window.innerWidth) 
            {
                setPosition((prevPosition) => ({ ...prevPosition, x: window.innerWidth - 100 }));
            }
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position]);
    

    return (
        <ContextMenu onContextMenu={(e) => handleEventClick(e)} onContextShow={() => setOpenOptions(false)} className={'w-full'}>

            <ContextMenuHeader className={'w-full'}>
                <Container wrap='no-wrap' flow='row' justifyItem='between' className={ColStyle} onClick={() => handleClick()}>

                    <h2 className={titleStyle}>
                        {title}
                    </h2>
                    <DropDownMenu isOpen={openOptions} onClose={() => setOpenOptions(false)}>
                        <DropDownHeader>
                            <IoEllipsisVerticalSharp className={`${active ? 'dark:text-black' : 'dark:text-neutral-600'} cursor-pointer`} />
                        </DropDownHeader>
                        <DropDownContent open={openOptions && !openConfirmation} className="fixed left-40 z-[8000] max-w-[200px] flex flex-col items-center justify-center">
                            {DropDownMenuContents()}
                        </DropDownContent>
                    </DropDownMenu>
                </Container>
            </ContextMenuHeader>

          
            <ContextMenuContent className={`fixed w-[400px] dark:bg-slate-800 pointer-events-none z-[1000] top-0`}>
                
                  
                        <DropDownMenu className={`fixed block w-full pointer-events-auto`} style={{top : `${position.y}px`}} isOpen={true}>
                            <DropDownContent open={true && !openConfirmation} className={`relative left-40 z-[1000] max-w-[200px] flex flex-col items-center justify-center dark:border-sky-300`}>
                                {DropDownMenuContents()}
                            </DropDownContent>
                        </DropDownMenu>
                  
                
            </ContextMenuContent>

            <Confirmation overlayClassName={'dark:bg-[rgb(10,10,10,0.1)]'} open={openConfirmation} onClose={()=> setOpenConfirmation(false)}>
                <ConfirmationHeader>
                    <h1 className='dark:text-white text-left text-2xl mb-2 font-mono'>Delete This Todo Document</h1>
                    <p className='dark:text-neutral-400 text-sm'>
                        Deleting this document will permanently remove all todos associated with it. 
                        These todos will not be saved in the archive and cannot be recovered. 
                        Are you sure you want to proceed with the deletion
                    </p>
                </ConfirmationHeader>
                <ConfirmationFooter isOpen={openConfirmation} />
            </Confirmation>

        </ContextMenu>
    )
})