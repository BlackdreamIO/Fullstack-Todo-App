import { useState, useEffect } from 'react';

import ProfileSection from './ProfileSection';
import { TodoColumnItem } from './TodoColum';

export default function TodoColumnPanel() 
{
    const [activeIndex, setActiveIndex] = useState(0);

    const [columnItem, setColumnItem] = useState(Array(10).fill(10).map((x, i) => `Todo Column Test ${i}`))

    return (
        <div className='dark:text-white dark:bg-[--darkSecondary] w-[250px] h-screen shadow-[5px_5px_20px_5px_rgb(15,15,15,0.5)]'>
            <section className='flex flex-col items-start justify-start space-y-2 h-[90vh] w-[250px] 
                pt-5 overflow-y-scroll [::-webkit-scrollbar{display:block]'>
                {
                    columnItem.map((x, i) => (
                        <TodoColumnItem 
                            key={`${x} === ${i}`}
                            title={x} 
                            active={activeIndex === i ? true : false} 
                            onClick={() => setActiveIndex(i)}
                        />
                    ))
                }
                {/* <TodoColumnItem title={'Daily Routine'}/>
                <TodoColumnItem title={'Meeting Tido'}/>
                <TodoColumnItem title={'Next Todo Project'}/> */}
            </section>
            <ProfileSection/>
        </div>
    )
}