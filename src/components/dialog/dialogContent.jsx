import { Button, buttonVarient } from "../button/button";
import { Input } from "../input/input";

import GoogleIcon from '../../Assets/images/googleIcon.png'
import GithubIcon from '../../Assets/images/GithubIcon.webp'

export default function DialogContent() 
{
    return (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] 
            dark:bg-[rgb(5,5,5,0.1)] w-[100%] h-screen backdrop-blur-[5px] flex flex-col items-center justify-center">

            <div className="dark:bg-[--primaryBG] w-[500px] min-h-auto h-auto m-auto p-2 pt-3 pb-3 rounded-md flex flex-col
            items-center justify-center space-y-5 min-[1200px]:w-[600px]">
                
                <div className="w-full">
                    <h1 className="dark:text-white text-center uppercase text-2xl min-[1200px]:text-3xl">
                        Log In
                    </h1>
                </div>

                 <ul className="flex flex-row items-center justify-center gap-5 w-full dark:bg-black p-2">
                    <Button className='w-[250px] flex flex-row items-center justify-center gap-2 font-normal' varient={buttonVarient.primary}>
                        <img src={GoogleIcon} className="w-[30px] h-[30px] rounded-[50%]" alt="google icon were not found" />
                        Google 
                    </Button>
                    <Button className='w-[250px] flex flex-row items-center justify-center gap-2 font-normal' varient={buttonVarient.primary}>
                        <img src={GithubIcon} className="w-[30px] h-[30px] rounded-[50%]" alt="google icon were not found" />
                        GitHub 
                    </Button>
                </ul>

                <div className="w-full flex flex-col items-center justify-center space-y-3">
                    <Input placeHolder={'Enter Email'} className="w-[90%] min-[1200px]:h-[60px]" />
                    <Input placeHolder={'Enter Passowrd'} className="w-[90%] min-[1200px]:h-[60px]" />
                    <Button 
                        className='w-[50%] min-[1200px]:h-[40px]' 
                        varient={buttonVarient.primary}>
                            Log In
                    </Button>
                </div>

                <div className="w-full space-y-5 flex flex-col items-center justify-center">
                    <p className="dark:text-white text-center uppercase text-sm min-[1200px]:text-md">OR</p>
                    <Button 
                        className='w-[50%] font-normal dark:text-neutral-500 dark:hover:text-neutral-100
                        min-[1200px]:text-lg' 
                        varient={buttonVarient.ghost}>
                            Create New Account
                    </Button>
                </div>

            </div>
        </div>
    )
}