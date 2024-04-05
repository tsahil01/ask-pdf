export function PdfRenderer() {
    return (
        <div className="grid md:grid-cols-2 w-screen">
            <div className="bg-gray-100 p-4 ">
                <div className="mt-4 rounded-xl">
                    <iframe
                    className="rounded-2xl"
                        src="https://utfs.io/f/fd5d46a7-5558-4cb1-8fd9-608a669cbb5c-9kfggk.pdf"
                        width="100%"
                        height={800}
                    />
                </div>
            </div>
            <div className="bg-gray-100 p-4">
                <div className="mt-4 rounded-xl">
                    <iframe
                    className="rounded-2xl"
                        src="https://utfs.io/f/fd5d46a7-5558-4cb1-8fd9-608a669cbb5c-9kfggk.pdf"
                        width="100%"
                        height={800}
                    />
                </div>
            </div>
        </div>
    )
}