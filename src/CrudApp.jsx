import React from 'react';
import Navbar from './components/Navbar';
import AuthPanel from './components/AuthPanel';

export default function CrudApp() 
{
 

    return (
        <div className='w-full'>
            <Navbar />
            {/* <AuthPanel open={open} /> */}
            <button onClick={() => alert("whore") }>fiuklcoing whore</button>
        </div>
    )
}
