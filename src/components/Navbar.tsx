"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "./User";

export function Navbar(){

  const session = useSession();

    return <>
    <div className="border-b overflow-hidden">
        <div className="flex flex-row sm:px-9 px-4 justify-between my-auto">
            <div className="flex flex-row p-2 my-auto">
                <div className="flex- flex-row gap-2 font-bold text-xl">
                    ask-PDF
                </div>
            </div>
            <div className="flex flex-row p-2 gap-2">
                { session.status == "unauthenticated"
                ?
                <button className="my-auto border p-1 rounded-lg font-bold hover:bg-zinc-200" onClick={()=>signIn()}>Sign in</button>
                : 
                <>
                <User email={ session.data?.user?.email || "" } name={ session.data?.user?.name || "" } image={ session.data?.user?.image || "" } />
                <button className="my-auto border p-1 rounded-lg font-bold hover:bg-zinc-200" onClick={()=>signOut()}>Sign out</button>
                </>      
                }
            </div>
        </div>
    </div>    
    </>
}