import { useUploadThing } from '@/app/lib/uploadThing';
import Loading from '@/app/loading';
import { ArrowBigDown, ArrowBigDownDashIcon, File, UploadCloudIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from './ui/use-toast';
import { addFiles } from '@/app/actions/db';

export default function UploadDropZone() {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const { toast } = useToast()

    const { startUpload } = useUploadThing("pdfUploader")    

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Filter out non-PDF files
        const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');

        // If no PDF files were dropped, show error message
        if (pdfFiles.length === 0) {
            toast({
                title: "Invalid file type",
                description: "Please upload only PDF files.",
            });
            return;
        }

        setDroppedFiles(acceptedFiles);
        setIsUploading(true);

        // Do backend logic of uploding here

        const res = await startUpload(acceptedFiles);
        if(!res){
            setIsUploading(false);
            return toast({
                title: "Something went wrong while uploading",
                description: "Please try again after some time."
            })
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;

        if(!key){
            setIsUploading(false);
            return toast({
                title: "Something went wrong while uploading. Key err.",
                description: "Please try again after some time."
            })
        }

        console.log("Res: ", res);
        console.log("Key: ", key);
        console.log("fileResponse: ", fileResponse);
        const name = fileResponse.name;
        const url = fileResponse.url;
        const uploadRes = await addFiles(name, url, key);

        if(uploadRes == "success"){
            toast({
                title: "File uploaded successfully",
                description: "Your file has been uploaded successfully."
            })
        }
        await setIsUploading(false);
        

    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false});

    return (
        <div {...getRootProps()} className={`border border-black h-64 border-dashed rounded-md hover:bg-gray-200 ${isDragActive ? 'bg-gray-200' : ''}`}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <div className='flex flex-col items-center justify-center h-full w-full text-center'>
                    <div className='flex flex-col justify-center gap-2'>
                        <ArrowBigDown className='w-10 h-10 mx-auto'/>
                        <p className="text-gray-500 text-center mx-auto">Drop the files here...</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full w-full text-center">
                {isUploading? (
                    <Loading/>
                ):
                (
                    droppedFiles.length > 0 ? (
                        <>
                            <p className="text-xs text-center text-gray-500 mb-5">Uploaded file:</p>
                            <div className='flex flex-col justify-center gap-2 border border-gray-400 rounded-md p-5'>
                                <File className='w-10 h-10 mx-auto'/>
                                <p className="text-sm w-20 truncate">{droppedFiles[0].name}</p>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col gap-2 justify-center'>
                            <UploadCloudIcon className='w-10 h-10 mx-auto'/>
                            <p className="text-gray-500 text-center mx-auto">Drag 'n' drop file here, or click to select file.</p>
                        </div>
                    )   
                )}
                </div>
            )}
        </div>
    );
}
