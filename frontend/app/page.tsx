"use client";

import { useEffect, useState } from "react";
import UploadSection from "../components/UploadSection";
import ChatSection from "../components/ChatSection";
import AnswerCard from "../components/AnswerCard";
import SourceCard from "../components/SourceCard";

export default function Home() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [papers, setPapers] = useState<
        {
            paper_id: string;
            paper_title: string;
        }[]
    >([]);

    const [selectedPaper, setSelectedPaper] = useState("");

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

        const papersResponse = await fetch(
            "http://127.0.0.1:8000/papers"
        );

        const papersData = await papersResponse.json();

        setPapers(papersData);
        setSelectedPaper(data.filename);

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
            `http://127.0.0.1:8000/ask?question=${encodeURIComponent(query)}&paper_id=${encodeURIComponent(selectedPaper)}`
        );

        const data = await response.json();

        setAnswer(data.answer);
        setSources(data.retrieved_chunks);

        setIsAsking(false);
    }

    async function loadPapers() {

        const response = await fetch(
            "http://127.0.0.1:8000/papers"
        );

        const data = await response.json();

        setPapers(data);

        if (data.length > 0 && !selectedPaper) {

            setSelectedPaper(data[0].paper_id);

        }

    }

    useEffect(() => {

        loadPapers();

    }, []);

    const currentPaper = papers.find(
        (paper) => paper.paper_id === selectedPaper
    );

    return (

        <main className="min-h-screen bg-background">

            <div className="flex min-h-screen">

                <aside className="w-80 border-r bg-card p-6 h-screen sticky top-0 overflow-y-auto">

                    <h2 className="text-2xl font-bold mb-6">
                        Paper Library
                    </h2>

                    <div className="space-y-2">

                        {papers.map((paper) => (

                            <button
                                key={paper.paper_id}
                                onClick={() => {
                                    setSelectedPaper(paper.paper_id);
                                    setAnswer("");
                                    setSources([]);
                                    setQuestion("");
                                }}
                                className={`
                                    w-full
                                    text-left
                                    border
                                    rounded-lg
                                    p-3
                                    transition-colors
                                    ${
                                        selectedPaper === paper.paper_id
                                            ? "bg-blue-100 border-blue-500 font-semibold"
                                            : "hover:bg-gray-50"
                                    }
                                `}
                            >
                                {paper.paper_title}
                            </button>

                        ))}

                    </div>

                </aside>

                <div className="flex-1 p-8 overflow-y-auto h-screen">

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
                            uploadedFileName={
                                currentPaper?.paper_title ?? selectedPaper
                            }
                            isUploading={isUploading}
                        />

                        {selectedPaper && (
                            <>
                                <div className="border-t" />

                                <ChatSection
                                    question={question}
                                    setQuestion={setQuestion}
                                    askQuestion={askQuestion}
                                    isAsking={isAsking}
                                    uploadedFileName={
                                        currentPaper?.paper_title ?? selectedPaper
                                    }
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

            </div>

        </main>

    );

}