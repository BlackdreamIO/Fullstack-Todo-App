
export const TodoItem = (props) => {

    const { title, descirption, complete, key } = props;

    return (
        <div key={key} className='p-2 m-2 dark:bg-zinc-900'>
            <h1 className='dark:text-white' >Title : {title}</h1>
            <h3 className='dark:text-white' >Descirption : {descirption}</h3>
            <p className='dark:text-white'>Complete : {complete}</p>
        </div>
    )
}
