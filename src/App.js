import { useEffect } from "react";
import "./App.css";
import CrudApp from "./CrudApp";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Route, Routes } from "react-router-dom";

export default function App() 
{
    useEffect(() => {
        window.addEventListener("contextmenu", e => e.preventDefault());
    }, [])
    
    return (
        <div className="h-screen dark:bg-black select-none">
            <Routes>
                <Route></Route>
            </Routes>
            <CrudApp/>
        </div>
    );
}

