import { Button } from "../button/button";
import { Input } from "../input/input";

export default function DialogContent() 
{
    return (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] 
            dark:bg-[rgb(5,5,5,0.1)] w-[100%] h-screen backdrop-blur-[5px] flex flex-col items-center justify-center">

            <div className="dark:bg-neutral-950 w-[700px] h-auto m-auto p-2 rounded-md">
                <Input placeHolder={'Enter Email'} />
            </div>
        </div>
    )
}