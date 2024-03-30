"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "./User";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

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
                <Button className="flex gap-1 p-1" variant={"outline"} onClick={()=>signIn()}>Sign in <LogIn/></Button>
                : 
                <>
                <User email={ session.data?.user?.email || "" } name={ session.data?.user?.name || "" } image={ session.data?.user?.image || "" } />
                <Button className="flex gap-1 p-1" variant={"outline"} onClick={()=>signOut()}>Sign out <LogOut/></Button>
                </>      
                }
            </div>
        </div>
    </div>    
    </>
}