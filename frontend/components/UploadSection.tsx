"use client";

import { Button } from "@/components/ui/button";

type UploadSectionProps = {
    selectedFile: File | null;
    setSelectedFile: (file: File | null) => void;
    uploadPDF: () => void;
    uploadResult: string;
    uploadedFileName: string;
    isUploading: boolean;
};

export default function UploadSection({
    selectedFile,
    setSelectedFile,
    uploadPDF,
    uploadResult,
    uploadedFileName,
    isUploading,
}: UploadSectionProps) {

    return (

        <div className="flex flex-col gap-6 p-8">

                <h2 className="text-2xl font-semibold">
                    Upload Research Paper
                </h2>

                <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(event) => {
                        if (event.target.files) {
                            setSelectedFile(event.target.files[0]);
                        }
                    }}
                />

                <label htmlFor="pdf-upload">
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        asChild
                        disabled={!!uploadResult}
                    >
                        <span>Browse PDF</span>
                    </Button>
                </label>

                {selectedFile && !uploadResult && (
                    <div className="rounded-lg border p-4 bg-muted/40">
                        <p className="text-sm text-muted-foreground">
                            Selected file
                        </p>

                        <p className="font-medium">
                            {selectedFile.name}
                        </p>
                    </div>
                )}

                {uploadResult && (
                    <div className="rounded-lg border border-green-300 bg-green-50 p-4">
                        <p className="font-semibold text-green-700">
                            ✓ Paper indexed successfully
                        </p>

                        <p className="mt-2 font-medium">
                            {uploadedFileName}
                        </p>

                        <p className="text-sm text-green-600">
                            {uploadResult}
                        </p>
                    </div>
                )}

                <Button
                    onClick={uploadPDF}
                    disabled={!selectedFile || isUploading || !!uploadResult}
                >
                    {isUploading ? "Uploading..." : "Upload PDF"}
                </Button>

            

        </div>

    );

}