import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useTaskContext } from '@/contextAPI/TaskContextAPI';
import { useKeyboardNavigationContext } from '@/contextAPI/KeybaordNavigationContextAPI';

import { Dialog, DialogContent } from '@/components/dialog/DialogComponent';

import { MorphicElement } from '@/components/morphicElement';
import { Typography } from '@/components/typography/typohgraphy';
import { Wrapper } from '@/components/wrapper/wrapper';
import { Input } from '@/components/cva/input/input';
import { Divider } from '@/components/divider';
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Button } from '@/components/cva/button/cvaButton';
import { DropDownContent, DropDownHeader, DropDownMenu } from '@/components/dropDown/DropDown';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Textarea from '@/components/textarea/textarea';

export const TodoEditDialog = forwardRef(({todoName='untitled', onOpen}, ref) => {
    
    const taskContext = useTaskContext();
    const keybaordContext = useKeyboardNavigationContext();

    const [dialogEnabled, setDialogEnabled] = useState(false);

    const [enableRename, setEnableRename] = useState(false);
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [currentState, setCurrentState] = useState('incomplete');
    const [currentPriority, setCurrentPriority] = useState('Priority 1');

    const [renameText, setRenameText] = useState('');
    const [description, setDescription] = useState('');

    const handleTodoEditDialogOpen = () => {
        setDialogEnabled(true)
    }
    
    const handleOnBlur = () => {
        if(keybaordContext.keybaordNavigationEnabled) {
            setDialogEnabled(false);
        }
    }

    useImperativeHandle(ref, () => ({
        callParentFunction: handleTodoEditDialogOpen,
    }))

    return (
        <Dialog open={dialogEnabled}>
            <DialogContent
                overlayClassName='bg-black bg-opacity-5' 
                className='max-w-screen-lg w-10/12 max-h-[500px] overflow-x-hidden overflow-y-scroll bg-theme-bgPrimary rounded-tenpixel border border-theme-borderPrimary select-none' 
                isOpen={dialogEnabled}>
                {/* HEADER */}
                <MorphicElement className='w-full bg-theme-bgTertiary p-2 flex flex-row items-center justify-between rounded-md'>
                    <Wrapper flow='row' wrap='no-wrap' element='ul' className='h-[30px] w-11/12 overflow-hidde flex items-center justify-start'>
                        <Typography variant={'h4'} className='text-left truncate'>
                            {taskContext.selectedTaskGroup} / {todoName}
                        </Typography>
                    </Wrapper>
                    <IoMdClose 
                        size='1.7rem'
                        className='bg-transparent hover:bg-white text-white hover:text-black p-1 rounded-tenpixel'
                        onClick={() => setDialogEnabled(false)}
                    />
                </MorphicElement>
                {/* CONTENT */}
                <MorphicElement className='w-full flex flex-row items-start space-x-2'>
                    <MorphicElement className='w-8/12 p-2 flex flex-col items-center space-y-5'>
                        {
                            enableRename ? 
                            ( <Input className='w-full bg-transparent hover:bg-transparent text-lg' placeholder={todoName}/> )
                            :
                            ( <Typography className='pointer-events-none font-bold'> 
                                <span className='text-theme-textSecondary mr-2 underline underline-offset-2'> TITLE : </span> 
                                {todoName} 
                            </Typography> )
                        }
                        <Wrapper flow='row' alignItem='center' justifyItem='start' className='w-full space-x-2'>
                            <Button width='full' intent='secondary' onClick={() => setEnableRename(!enableRename)}>Edit</Button>
                        </Wrapper>
                        <Wrapper flow='col' alignItem='start' justifyItem='start' className='w-full space-x-2'>
                            <Typography>Descirption</Typography>
                            <Textarea 
                                placeholder='your descirption' 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Wrapper>
                    </MorphicElement>
                    <MorphicElement className='w-4/12 py-3 px-2 bg-theme-bgSecondary flex flex-col items-center justify-start space-y-5'>
                        <DropDownMenu className='w-full shadow-none' isOpen={showStateDropdown} onClose={()=>setShowStateDropdown(false)}>
                            <Typography className='pointer-events-none mb-2'>Edit State</Typography>
                            <DropDownHeader className='w-full'>
                                <Button 
                                    onClick={()=>setShowStateDropdown(true)} 
                                    width='full' 
                                    intent='transparent' 
                                    className='bg-black border-regulerBorder border-transparent hover:border-[aquamarine] capitalize'>
                                        {currentState}
                                </Button>
                            </DropDownHeader>
                            <DropDownContent className='shadow-none z-10 w-full' open={showStateDropdown}>
                                <Button onClick={() => setCurrentState('incomplete')} width='full' intent='secondary'>
                                    Incomplete
                                </Button>
                                <Button onClick={() => setCurrentState('pending')} width='full' intent='secondary'>
                                    Pending
                                </Button>
                                <Button onClick={() => setCurrentState('complete')} width='full' intent='secondary'>
                                    Complete
                                </Button>
                            </DropDownContent>
                        </DropDownMenu>
                        <Divider className='bg-theme-bgTertiary w-full'/>
                        <DropDownMenu className='w-full shadow-none' isOpen={showPriorityDropdown} onClose={()=>setShowPriorityDropdown(false)}>
                            <Typography className='pointer-events-none mb-2'>Edit Priority</Typography>
                            <DropDownHeader className='w-full'>
                                <Button 
                                    onClick={()=>setShowPriorityDropdown(true)} 
                                    width='full' 
                                    intent='transparent' 
                                    className='bg-black border-regulerBorder border-transparent hover:border-[aquamarine] capitalize'>
                                        {currentPriority}
                                </Button>
                            </DropDownHeader>
                            <DropDownContent className='shadow-none z-10 w-full' open={showPriorityDropdown}>
                                <Button onClick={() => setCurrentPriority('priority 1')} width='full' intent='transparent' outline='off' className='bg-red-800 text-theme-textPrimary'>
                                    Priority 1
                                </Button>
                                <Button onClick={() => setCurrentPriority('priority 2')} width='full' intent='transparent' outline='off' className='bg-yellow-800 text-theme-textPrimary'>
                                    Priority 2
                                </Button>
                                <Button onClick={() => setCurrentPriority('priority 3')} width='full' intent='transparent' outline='off' className='bg-sky-800 text-theme-textPrimary'>
                                    Priority 3
                                </Button>
                                <Button onClick={() => setCurrentPriority('priority 4')} width='full' intent='secondary' outline='off'>
                                    Priority 4
                                </Button>
                            </DropDownContent>
                        </DropDownMenu>
                        <Divider className='bg-theme-bgTertiary w-full'/>
                        <MorphicElement className='w-full'>
                            <Typography className='pointer-events-none mb-2'>Start Date</Typography>
                            <DatePicker 
                                className='bg-black py-1 px-2 border-regulerBorder border-transparent hover:border-[aquamarine]' 
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                            />
                        </MorphicElement>
                        <Divider className='bg-theme-bgTertiary w-full'/>
                        <MorphicElement className='w-full'>
                            <Typography className='pointer-events-none mb-2'>End Date</Typography>
                            <DatePicker 
                                className='bg-black py-1 px-2 border-regulerBorder border-transparent hover:border-[aquamarine]' 
                                selected={endDate} 
                                onChange={(date) => setEndDate(date)} 
                            />
                        </MorphicElement>
                        <Divider className='bg-theme-bgTertiary w-full'/>
                        <Button width='full'>Apply Changes</Button>
                        <Button width='full' intent='error'>Delete</Button>
                    </MorphicElement>
                </MorphicElement>
            </DialogContent>
        </Dialog>
    )
})

export default TodoEditDialog;