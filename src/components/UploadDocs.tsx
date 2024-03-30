"use client";

import { UploadCloud } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function UploadDoc(){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return <>
    <Dialog open={isOpen}
        onOpenChange={(v)=>{
            if(!v) {
                setIsOpen(v)
            }
        }}>
      <DialogTrigger onClick={()=>setIsOpen(true)} asChild>
        <Button className="" variant={"outline"}>
            Upload PDF <UploadCloud/>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>
}