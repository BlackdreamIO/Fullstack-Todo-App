import { useEffect } from "react";
import "./App.css";
import CrudApp from "./CrudApp";

export default function App() 
{
    useEffect(() => {
        window.addEventListener("contextmenu", e => e.preventDefault());
    }, [])
    
    return (
        <div className="h-screen dark:bg-black">
            <CrudApp/>
        </div>
    );
}

