import { useEffect } from "react";
import "./App.css";
import CrudApp from "./CrudApp";

import { Route, Routes, router } from "react-router-dom";
import { Typography } from "@mui/material";

import toast, { Toaster } from 'react-hot-toast';
import { StartNotification } from "./components/Tostify/profileTostify";
import TodoPage from "./app/TodoPage/TodoPage";

export default function App() 
{
    useEffect(() => {
        window.addEventListener("contextmenu", e => e.preventDefault());

        if(!localStorage.getItem('userRegistered'))
        {
            StartNotification();
            localStorage.setItem('userRegistered', true)
        }
    }, [])
    
    return (
        <div className="h-screen dark:bg-black">
            <Routes>
                <Route path="/" element={<TodoPage />} />
                <Route path="/:todoID" element={<CrudApp />} />
                <Route path="*" element={<Typography variant="h1" className='dark:text-white text-blue-50 text-center mt-10'>CLIENT SIDE EXEPTION HAS OCCURED</Typography>} />
            </Routes>
            <Toaster/>
        </div>
    );
}

