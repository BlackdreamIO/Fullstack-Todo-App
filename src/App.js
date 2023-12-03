import { useEffect } from "react";
import "./App.css";
import CrudApp from "./CrudApp";

import { Route, Routes, router } from "react-router-dom";
import { Typography } from "@mui/material";
import TodoListPanel from "./components/TodoListPanel";

export default function App() 
{
    useEffect(() => {
        window.addEventListener("contextmenu", e => e.preventDefault());
    }, [])
    
    return (
        <div className="h-screen dark:bg-black select-none">
            <Routes>
                <Route path="/" element={<CrudApp />} />
                <Route path="/todo/:todoID" element={<CrudApp />} />
                <Route path="*" element={<Typography variant="h1" className='dark:text-white'> 404 NOT FOUND SERVER EXEPTION</Typography>} />
            </Routes>
            {/* <CrudApp/> */}
        </div>
    );
}

