import { useState, Fragment } from "react";

import { Button } from "@/components/cva/button/cvaButton";
import { Input } from "@/components/input/input";
import { DropDownContent, DropDownMenu, DropDownHeader } from "@/components/dropDown/DropDown";


export function ContextMenuComponent()
{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownOpen = (e) => {
        setIsDropdownOpen(!isDropdownOpen);
    } 

    return (
        <Fragment>
            <Button width='full' intent='secondary'>Show Details</Button>
            <DropDownMenu className='w-full' isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)}>
                <DropDownHeader onClick={handleDropdownOpen}>
                    <Button width='full' intent='secondary'>Edit This Section</Button>
                </DropDownHeader>
                <DropDownContent className='absolute bottom-10 w-[200px]' open={isDropdownOpen}>
                    <Input placeholder='Rename'/>
                    <Button intent='secondary' width='full'>Change Color</Button>
                    <Button width='full'>Apply Changes</Button>
                </DropDownContent>
            </DropDownMenu>
            <Button width='full' intent='error'>Delete</Button>
        </Fragment>
    );
};