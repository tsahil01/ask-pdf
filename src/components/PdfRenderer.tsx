export function PdfRenderer() {
    return (
        <div className="grid md:grid-cols-2">
            <div className="bg-gray-100 p-4">
                <div className="text-3xl font-bold">PDF Viewer</div>
                <div className="mt-4">
                    <iframe
                        src="https://utfs.io/f/fd5d46a7-5558-4cb1-8fd9-608a669cbb5c-9kfggk.pdf"
                        width="100%"
                        height="850"
                    />
                </div>
            </div>
            <div className="bg-gray-100 p-4">
                <div className="text-3xl font-bold">PDF Editor</div>
                <div className="mt-4">
                    <iframe
                        src="https://drive.google.com/drive/folders/11KCp9ZRP-UkZEA2t3Iksu-Kd1qbAmXSa"
                        width="100%"
                        height="600"
                    />
                </div>
            </div>
        </div>
    )
}