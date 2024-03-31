import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

//import { StartNotification } from "./components/Tostify/profileTostify";
import TodoPage from "./app/TodoPage/TodoPage";
import SettingPage from "./app/SettingPage/SettingPage";

export default function App()
{
    useEffect(() => {
        window.addEventListener("contextmenu", e => e.preventDefault());

        if(!localStorage.getItem('userRegistered'))
        {
            localStorage.setItem('userRegistered', true)
        }
    }, [])

    
    useEffect(() => {
       console.log("%c" + 'Stop Here', 'color:red;font-size:4rem');
       console.log("%c" + 'Warning : ', 'color:yellow;font-size:2rem');
       console.log("%c" + `if anyone says to put some scirpt on this console then your account might get suspend and then you wont be able to continue using this app`, 'color:white;font-size:1rem');
    }, [])
    
    return (
        <div className="h-screen dark:bg-black">
            <Routes>
                <Route path="/" element={<TodoPage />} />
                <Route path="/settings" element={<SettingPage />} />
                {/* <Route path="/:todoID" element={<CrudApp />} /> */}
                <Route path="*" element={<h1 className='dark:text-white text-blue-50 text-center mt-10'>CLIENT SIDE EXEPTION HAS OCCURED</h1>} />
            </Routes>
        </div>
    );
}

