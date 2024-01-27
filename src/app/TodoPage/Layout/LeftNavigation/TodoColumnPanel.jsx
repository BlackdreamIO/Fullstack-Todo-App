import { useState, useEffect } from 'react';

import ProfileSection from './ProfileSection';
import { TodoColumnItem } from './TodoColum';

export default function TodoColumnPanel() 
{
    const [isActive, setIsActive] = useState(false);

    return (
        <div className='dark:text-white dark:bg-[--darkSecondary] w-[250px] h-screen shadow-[5px_5px_20px_5px_rgb(15,15,15,0.5)]'>
            <section className='flex flex-col items-start justify-start space-y-2 h-[90vh] w-[250px] 
                pt-5 overflow-y-scroll [::-webkit-scrollbar{display:block]'>
                {
                    Array(10).fill(10).map((x, i) => (
                        <TodoColumnItem 
                            title={`Column Test ${i}`} 
                            active={isActive} 
                            onClick={() => setIsActive(true)}
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