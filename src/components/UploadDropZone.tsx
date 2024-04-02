import Loading from '@/app/loading';
import { ArrowBigDown, ArrowBigDownDashIcon, File, UploadCloudIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadDropZone() {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Set the dropped files to state
        setDroppedFiles(acceptedFiles);
        // Start the upload process
        setIsUploading(true);
        // Simulate an upload process (you may replace this with your actual upload logic)

        // Do backend logic of uploding here
        setTimeout(() => {
            // Finish the upload process
            setIsUploading(false);
        }, 2000); // Simulating a 2-second upload process
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
