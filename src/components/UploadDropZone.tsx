import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadDropZone() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false});

    return (
        <div {...getRootProps()} className={`border border-red-500 h-64 border-dashed rounded-md ${isDragActive ? 'bg-gray-200' : ''}`}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="flex items-center justify-center h-full w-full text-center">Drop the files here...</p>
            ) : (
                <p className="flex items-center justify-center h-full w-full text-center text-gray-500">Drag 'n' drop file here, or click to select file.</p>
            )}
        </div>
    );
}
