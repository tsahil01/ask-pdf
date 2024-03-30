import { Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useRecoilValue } from "recoil"
import { filesAtom } from "@/atom/filesAtom"

export function DashboardFiles() {
    const filesData = useRecoilValue(filesAtom);

    return (
        <div className="grid md:grid-cols-3 gap-4 w-full">
            {filesData.map((file, index) => (
                <EachDoc
                    key={index}
                    name={file.name}
                    date={file.createdAt}
                />
            ))}
        </div>
    );
}

function EachDoc({name, date, opened, del }: { name: string; date: Date; opened?: string; del?: string; }){
    return <>
    
    <Card className="w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="text-xs">Last Opened: {date.toDateString()}</CardDescription>
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








