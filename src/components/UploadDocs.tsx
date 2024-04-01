import { UploadCloud } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import UploadDropZone from "./UploadDropZone";

export default function UploadDoc(){
    return <>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant={"outline"}>
            Upload PDF <UploadCloud/>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload your PDF file here.
          </DialogDescription>
          <UploadDropZone/>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>
}