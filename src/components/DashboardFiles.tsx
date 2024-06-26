import { Button } from "./ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useRecoilValue } from "recoil"
import { filesAtom } from "@/atom/filesAtom"
import { useRouter } from "next/navigation"
import DeleteBtn from "./DeleteFile"

export function DashboardFiles() {
    const filesData = useRecoilValue(filesAtom);

    return (
        <div className="grid md:grid-cols-3 gap-4 w-full">
            {filesData.map((file, index) => (
                <EachDoc
                    key={index}
                    id={file.id}
                    name={file.name}
                    date={file.createdAt}
                    keyuploadthing={file.key}
                />
            ))}
        </div>
    );
}

function EachDoc({id, name, date, opened, del, keyuploadthing }: { id: string; name: string; date: Date; opened?: string; del?: string; keyuploadthing: string}){
    const router = useRouter();
    return <>
    
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="truncate">{name}</CardTitle>
            <CardDescription className="text-xs">Last Opened: {date.toDateString()}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <Button onClick={()=>router.push(`/dashboard/${id}`)}>Open</Button>
            <DeleteBtn id = { id } uploadthingKey= {keyuploadthing}/>

        </CardFooter>
    </Card>
    </>
}








