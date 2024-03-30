
import { Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useRecoilValue } from "recoil"
import { filesAtom } from "@/atom/filesAtom"

export function DashboardFiles(){
    const getFiles = useRecoilValue(filesAtom);
    console.log("FILESSSSSSS: ", getFiles)
    return <>
    <div className="grid md:grid-cols-3 gap-4 w-full">
        <EachDoc name="Some name" date="23 March 2024"/>
        <EachDoc name="Some name" date="23 March 2024"/>
        <EachDoc name="Some name" date="23 March 2024"/>
        <EachDoc name="Some name" date="23 March 2024"/>
    </div>
    </>
}

function EachDoc({name, date, opened, del }: { name: string; date: string; opened?: string; del?: string; }){
    return <>
    
    <Card className="w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="text-xs">Last Opened: {date}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button>Open</Button>
                <Button variant={"outline"} className="">
                    <Trash2Icon/>
                </Button>
            </CardFooter>
        </Card>
    </>
}






