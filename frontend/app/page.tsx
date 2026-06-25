"use client";

import { useState } from "react";

export default function Home() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResult, setUploadResult] = useState("");

    async function uploadPDF() {

        if (!selectedFile) {
            alert("Please choose a PDF first.");
            return;
        }

        const formData = new FormData();

        formData.append("file", selectedFile);

        const response = await fetch(
            "http://127.0.0.1:8000/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        setUploadResult(
            `Successfully created ${data.number_of_chunks} chunks.`
        );
    }

    return (

        <main
            style={{
                padding: "40px",
                fontFamily: "Arial"
            }}
        >

            <h1>📄 PaperLens</h1>

            <br />

            <input

                type="file"

                accept=".pdf"

                onChange={(event) => {

                    if (event.target.files) {
                        setSelectedFile(event.target.files[0]);
                    }

                }}

            />

            <br />
            <br />

            {selectedFile && (
                <>
                    <p>
                        Selected File:
                        <br />
                        <b>{selectedFile.name}</b>
                    </p>

                    <button onClick={uploadPDF}>
                        Upload PDF
                    </button>

                    <br />
                    <br />

                    <p>{uploadResult}</p>
                </>
            )}
        </main>

    );

}