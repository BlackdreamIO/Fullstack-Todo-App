import { useState, useEffect } from 'react';

import ProfileSection from './ProfileSection';
import { TodoColumnItem } from './TodoColum';
import { Container } from '@/components/container/container';
import BottomNavigationStatus from '../BottomNavigation/BottomNavigationStatus';

export default function TodoColumnPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);

    const [columnItem, setColumnItem] = useState(Array(15).fill(true).map((x, i) => `Todo Column Test ${i}`))

    return (
        <div className='dark:text-white dark:bg-[--darkSecondary] bg-[--lightPrimary] w-[250px] h-[95vh]'>
            <Container flow='col' alignItem='start' justifyItem='start' wrap='no-wrap' className='h-[90%] w-[250px] pt-5 overflow-y-scroll'>
                {
                    columnItem.map((v, i) => (
                        <TodoColumnItem 
                            key={v}
                            title={v} 
                            active={activeIndex === i ? true : false} 
                            onClick={() => setActiveIndex(i)}
                        />
                    ))
                }
            </Container>
            {/* <ProfileSection/> */}
            <BottomNavigationStatus/>
        </div>
    )
}