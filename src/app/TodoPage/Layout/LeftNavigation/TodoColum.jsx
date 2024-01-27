
export const TodoColumnItem = ({title, active=false, onClick}) => {

    const handleClick = () => {
        if(onClick != null) {
            onClick();
        }
    }

    return (
        <div className={`w-full min-h-[50px] flex flex-col items-start justify-center p-2 border-l-4 
        dark:hover:bg-[--darkFour] group
        ${active ? 'dark:bg-[--darkFour] dark:border-indigo-500' : 'dark:bg-transparent dark:border-transparent'}
        cursor-default`} 
        onClick={() => handleClick()}>

            <h2 className="font-bold mb-1 dark:text-neutral-500 dark:group-hover:text-neutral-300">
                {title}
            </h2>
        </div>
    )
}