import { Loader2 } from "lucide-react";

export default function Loading(){
    return <>
    <div className="text-3xl flex justify-center">
        <Loader2 className="w-16 h-16 animate-spin"/>
        </div>
    </>
}