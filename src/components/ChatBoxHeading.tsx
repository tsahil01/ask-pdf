export function ChatBoxHeading(){
    return <>
        <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-3xl font-bold text-center'>Just type your 
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-700'> Questions <br/></span>
                and Get <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-pink-500'> Quick </span> Answers!
            </h1>
        </div>
    </>
}