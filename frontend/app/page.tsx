"use client";

import { useState } from "react";
import UploadSection from "../components/UploadSection";
import ChatSection from "../components/ChatSection";
import AnswerCard from "../components/AnswerCard";

export default function Home() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
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
    
    async function askQuestion() {

        if (!question) {
            alert("Please enter a question.");
            return;
        }

        const response = await fetch(
            `http://127.0.0.1:8000/ask?question=${encodeURIComponent(question)}`
        );

        const data = await response.json();

        setAnswer(data.answer);
        setSources(data.retrieved_chunks);
    }

    return (

        <main className="min-h-screen bg-background">

            <div className="max-w-3xl mx-auto px-6 py-12">

                <h1 className="text-5xl font-bold text-center">
                    PaperLens
                </h1>

                <p className="text-muted-foreground text-center mt-3 mb-10">
                    AI-powered Research Paper Assistant
                </p>

                <UploadSection
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    uploadPDF={uploadPDF}
                    uploadResult={uploadResult}
                />

                {uploadResult && (
                    <div className="mt-8">

                        <ChatSection
                            question={question}
                            setQuestion={setQuestion}
                            askQuestion={askQuestion}
                        />

                        <AnswerCard
                            answer={answer}
                        />

                    </div>
                )}

            </div>

        </main>

    );

}