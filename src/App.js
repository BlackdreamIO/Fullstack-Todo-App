import CRUDApp from "./Crud";

export default function App() 
{
    console.log(process.env.REACT_APP_FIREBASE_API);
    return (
        <div>
            <CRUDApp/>
        </div>
    );
}

