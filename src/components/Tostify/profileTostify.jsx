import toast, { Toaster } from 'react-hot-toast';

export const CustomNotify = () => {

    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full dark:bg-black bg-black shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
                  border-[1px] dark:border-neutral-700 `}
            >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                            alt=""
                        />
                        </div>
                        <div className="ml-3 flex-1">
                            <a href='https://blackdreamio.vercel.app' 
                                target='_blank'
                                className="text-sm font-medium dark:text-white text-white decor">
                                Blackdream
                            </a>
                            <p className="mt-1 text-sm dark:text-white text-white">
                                Hey User, This Is My One Of Portfolio Project | I Will Try Regulerly Bring Update To
                                This App So That It Can Have More Feature Currently It Doesnt Have Much Of A Content 
                                Or Functionality So You Might Face Some Difficulties
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-[mediumspringgreen]">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm 
                                font-medium text-neutral-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200">
                        Close
                    </button>
                </div>
        </div>
    ), {
        duration:10000,
        position: 'top-center',
    })
}