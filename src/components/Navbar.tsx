export function Navbar(){
    return <>
    <div className="border-b">
        <div className="flex flex-row sm:px-9 px-4 justify-between my-auto">
            <div className="flex flex-row p-2 my-auto">
                <div className="flex- flex-row gap-2 font-bold text-xl">
                    ask-PDF
                </div>
            </div>
            <div className="flex flex-row p-2 gap-2">
                <div className="my-auto border p-1 rounded-lg font-bold hover:bg-zinc-200">Sign in</div>
            </div>
        </div>
    </div>    
    </>
}