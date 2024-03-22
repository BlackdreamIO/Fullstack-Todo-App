import { useEffect, useState, useRef, Fragment, memo } from 'react';

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { CiTrash, CiEdit } from "react-icons/ci";
import { FiColumns } from "react-icons/fi";

import { Input } from '@/components/cva/input/input';
import { Button } from '@/components/cva/button/cvaButton';
import { Container } from '@/components/container/container';
import { Wrapper } from '@/components/wrapper/wrapper';
import { DropDownMenu, DropDownHeader, DropDownContent } from '@/components/dropDown/DropDown';
import { Confirmation, ConfirmationHeader, ConfirmationFooter } from '@/components/confirmation/ConfirmationComponent';
import { useKeyPress } from '@/hooks/useKeyPress';
import { Typography } from '@/components/typography/typohgraphy';

export const TaskGroupPanelItem = memo(({title, active=false, minimizedMode=false, keyboardFocus=false, isFocused=false, onClick}) => {

    const [openOptions, setOpenOptions] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [renamedText, setRenamedText] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);
    const dropdownAnchorRef = useRef(null);

    const handleClick = () => {
        if(onClick != null) onClick();
    }

    const handleDropdownOpen = (e) => {
        const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();
        setPosition({ x: getCalculatedPosition(anchorRect.left, 50, 20), y: getCalculatedPosition(e.clientY)});
        setOpenOptions(true);
    } 
    // calculate the x and y position so that element doesnt get out of bound
    const getCalculatedPosition = (value, threashold=375, minusOffset=120) => {
        const calculatedAxis =  value < threashold ? value : value - minusOffset;
        return calculatedAxis;
    }

    useEffect(() => {
        if(!active) setOpenOptions(false);
    }, [active])
    
    const handleKeyPress = () => {
        if(active && isFocused) 
        {
            const rect = containerRef.current.getBoundingClientRect();
            const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();

            setPosition({ 
                x: getCalculatedPosition(anchorRect.left, 50, 20), 
                y: getCalculatedPosition(rect.top) 
            });

            setOpenOptions(true);
        }
        else {
            setOpenOptions(false);
        }
    }

    useKeyPress('e', handleKeyPress);

    const ColStyle = `w-[95%] min-h-[40px] px-2 pt-1 group rounded-lg cursor-default transition-all duration-150 border-[3px] border-transparent
        ${active ? 'bg-theme-bgPrimaryLight' : 'bg-transparent'}
        ${keyboardFocus ? 'border-blue-500' : 'text-neutral-500 group-hover:text-neutral-200'}`

    const titleStyle = `mb-1 font-sans font-bold text-[0.9rem] flex gap-2 items-center justify-center ${active ? 'dark:text-black text-black' : 'text-neutral-500 group-hover:text-neutral-200'}`

    return (
        <Wrapper className={'w-full'}>
            <Container ref={containerRef} wrap='no-wrap' flow='row' justifyItem='between' className={ColStyle} onClick={() => handleClick()}>
                    <Wrapper flow='col' >
                        {
                            minimizedMode ? ( <div> <CiEdit className={titleStyle}/> </div> ) 
                            : 
                            ( <h2 className={titleStyle}> {title} </h2> )
                        }
                    </Wrapper>
                    <DropDownMenu isOpen={openOptions} onClose={() => setOpenOptions(false)}>
                        <DropDownHeader ref={dropdownAnchorRef} onClick={(e) => handleDropdownOpen(e)}>
                            <IoEllipsisVerticalSharp className={`${active ? 'text-black' : 'text-theme-textTertiary'} cursor-pointer`} />
                        </DropDownHeader>
                        <Wrapper style={{top : `${position.y}px`, left : `${position.x}px`}} className='fixed w-full pointer-events-none flex-col flex-nowrap items-start justify-start' >
                            <DropDownContent open={openOptions && !openConfirmation} className={`relative left-12 max-w-[200px] flex flex-col items-center justify-center pointer-events-auto bg-theme-bgPrimary border-neutral-800`}>
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

            <Confirmation overlayClassName={'dark-theme:bg-[rgb(5,5,5,0.5)]'} open={openConfirmation} onClose={()=> setOpenConfirmation(false)}>
                <ConfirmationHeader>
                    <h1 className='text-theme-textPrimary text-left text-2xl mb-2'>Delete This Todo Document</h1>
                    <Typography className='text-theme-textTertiary text-sm'>
                        Deleting this document will permanently remove all todos associated with it. 
                        These todos will not be saved in the archive and cannot be recovered. 
                        Are you sure you want to proceed with the deletion
                    </Typography>
                </ConfirmationHeader>
                <ConfirmationFooter isOpen={openConfirmation} />
            </Confirmation>

        </Wrapper>
    )
})