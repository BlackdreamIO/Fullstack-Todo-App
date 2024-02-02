import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import env from "react-dotenv";

import { BrowserRouter } from "react-router-dom";

// Import your publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)