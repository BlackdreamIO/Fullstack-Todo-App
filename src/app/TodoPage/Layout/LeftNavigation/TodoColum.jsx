import { useEffect, useState, Fragment, memo } from 'react';

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { CiTrash, CiEdit } from "react-icons/ci";
import { FiColumns } from "react-icons/fi";
import { BiBookmarkAlt } from "react-icons/bi";

import { Input } from '@/components/cva/input/input';
import { Button } from '@/components/cva/button/cvaButton';
import { Container } from '@/components/container/container';
import { Wrapper } from '@/components/wrapper/wrapper';
import { DropDownMenu, DropDownHeader, DropDownContent } from '@/components/dropDown/DropDown';
import { ContextMenu, ContextMenuHeader, ContextMenuContent } from '@/components/contextMenu/contextMenuComponent';
import { Confirmation, ConfirmationHeader, ConfirmationFooter } from '@/components/confirmation/ConfirmationComponent';

export const TodoColumnItem = memo(({title, active=false, keyboardFocus=false, onClick}) => {

    const [openOptions, setOpenOptions] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [renamedText, setRenamedText] = useState('');
    const [position, setPosition] = useState({ x: 200, y: 0 });

    const handleClick = () => {
        if(onClick != null) onClick();
    }

    const handleDropdownOpen = (e) => {
        setPosition({ x: 200, y: getCalculatedPosition(e.clientX, e.clientY) });
        setOpenOptions(true);
    } 

    // calculate the x and y position so that element doesnt get out of bound
    const getCalculatedPosition = (x, y) => {
        const calculatedX = 0;
        const calculatedY =  y < 375 ? y : y - 120;
        return calculatedY;
    }

    useEffect(() => {
        const handleResize = () => {
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
        return () => window.removeEventListener('resize', handleResize);

    }, [position]);

    const ColStyle = `w-[95%] min-h-[40px] px-2 pt-1 border-l-4 group rounded-lg cursor-default transition-all duration-150
        ${active ? 'dark:bg-white bg-neutral-100 dark:border-neutral-500 border-indigo-500' : 'dark:bg-transparent dark:border-transparent'}
        ${keyboardFocus ? 'border-[3px] dark:border-blue-500' : 'text-neutral-500 group-hover:text-neutral-200'}`

    const titleStyle = `mb-1 font-sans font-bold text-[0.9rem] ${active ? 'dark:text-black text-black' : 'text-neutral-500 group-hover:text-neutral-200'}`

    return (
        <ContextMenu onContextMenu={(e) => handleDropdownOpen(e)} onContextShow={() => setOpenOptions(false)} className={'w-full'}>

            <ContextMenuHeader className='w-full'>
                <Container wrap='no-wrap' flow='row' justifyItem='between' className={ColStyle} onClick={() => handleClick()}>
                    
                    <Wrapper flow='col' >
                        <h2 className={titleStyle}> {title}  </h2>
                    </Wrapper>

                    <DropDownMenu isOpen={openOptions} onClose={() => setOpenOptions(false)}>
                        <DropDownHeader onClick={(e) => handleDropdownOpen(e)}>
                            <IoEllipsisVerticalSharp className={`${active ? 'dark:text-black' : 'dark:text-neutral-600'} cursor-pointer`} />
                        </DropDownHeader>
                        <Wrapper style={{top : `${position.y}px`}} className='fixed w-full left-20 pointer-events-none flex-col flex-nowrap items-start justify-start' >
                            <DropDownContent open={openOptions && !openConfirmation} className={`relative left-40 z-[8000] max-w-[200px] flex flex-col items-center justify-center pointer-events-auto`}>
                                <Fragment>
                                    <Input width='full' value={title} onChange={(e) => setRenamedText(e.target.value)} placeholder='text'/>
                                    <Button width='full' LoadingText='Renaming' loading  outline='off' intent='secondary'> <CiEdit/> Rename</Button>
                                    <Button width='full' outline='off' intent='secondary'><FiColumns/> Change Icon</Button>
                                    <Button onClick={() => setOpenConfirmation(true)} width='full' outline='off' intent='secondaryError'><CiTrash /> Delete This List</Button>
                                </Fragment>
                            </DropDownContent>
                        </Wrapper>
                    </DropDownMenu>
                </Container>
            </ContextMenuHeader>

          
            <ContextMenuContent className={`fixed dark:bg-slate-800 pointer-events-none z-[1000] top-0`}>
                <DropDownMenu className={`fixed w-full left-20 `} style={{top : `${position.y}px`}} isOpen={true}>
                    <DropDownContent open={true && !openConfirmation} className={`relative left-40 z-[1000] max-w-[200px] flex flex-col items-center justify-center dark:border-sky-300 pointer-events-auto`}>
                        <Input width='full' value={title} onChange={(e) => setRenamedText(e.target.value)} placeholder='text'/>
                        <Button width='full' LoadingText='Renaming' loading  outline='off' intent='secondary'> <CiEdit/> Rename</Button>
                        <Button width='full' outline='off' intent='secondary'><FiColumns/> Change Icon</Button>
                        <Button onClick={() => setOpenConfirmation(true)} width='full' outline='off' intent='secondaryError'><CiTrash /> Delete This List</Button>
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