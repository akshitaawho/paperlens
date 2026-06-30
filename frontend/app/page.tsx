"use client";

import { useState } from "react";
import UploadSection from "../components/UploadSection";
import ChatSection from "../components/ChatSection";
import AnswerCard from "../components/AnswerCard";
import SourceCard from "../components/SourceCard";

export default function Home() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [sources, setSources] = useState<
        { text: string; distance: number }[]
    >([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isAsking, setIsAsking] = useState(false);
    const [uploadResult, setUploadResult] = useState("");

    async function uploadPDF() {

        if (!selectedFile) {
            alert("Please choose a PDF first.");
            return;
        }

        setIsUploading(true);

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
        setUploadedFileName(data.filename);

        setUploadResult(
            `Successfully created ${data.number_of_chunks} chunks.`
        );

        setIsUploading(false);
    }
    
    async function askQuestion(customQuestion?: string) {

        const query = customQuestion ?? question;

        if (!query) {
            alert("Please enter a question.");
            return;
        }

        setIsAsking(true);

        const response = await fetch(
            `http://127.0.0.1:8000/ask?question=${encodeURIComponent(query)}&paper_id=${encodeURIComponent(uploadedFileName)}`
        );

        const data = await response.json();

        setAnswer(data.answer);
        setSources(data.retrieved_chunks);

        setIsAsking(false);
    }

    return (

        <main className="min-h-screen bg-background">

            <div className="max-w-4xl mx-auto px-6 py-12">

                <h1 className="text-5xl font-bold text-center">
                    PaperLens
                </h1>

                <p className="text-muted-foreground text-center mt-3 mb-10">
                    AI-powered Research Paper Assistant
                </p>

                <div className="rounded-2xl border bg-card shadow-sm">

                    <UploadSection
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        uploadPDF={uploadPDF}
                        uploadResult={uploadResult}
                        uploadedFileName={uploadedFileName}
                        isUploading={isUploading}
                    />

                    {uploadResult && (
                        <>
                            <div className="border-t" />

                            <ChatSection
                                question={question}
                                setQuestion={setQuestion}
                                askQuestion={askQuestion}
                                isAsking={isAsking}
                                uploadedFileName={uploadedFileName}
                            />

                            <AnswerCard
                                answer={answer}
                            />

                            <SourceCard
                                sources={sources}
                            />
                        </>
                    )}

                </div>

            </div>

        </main>

    );

}