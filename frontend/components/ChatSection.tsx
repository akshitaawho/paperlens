"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatSectionProps = {
    question: string;
    setQuestion: (question: string) => void;
    askQuestion: (customQuestion?: string) => void;
    isAsking: boolean;
    uploadedFileName: string;
};

const exampleQuestions = [
    "What is this paper about?",
    "How does the proposed method work?",
    "What are the key findings?",
];

export default function ChatSection({
    question,
    setQuestion,
    askQuestion,
    isAsking,
    uploadedFileName,
}: ChatSectionProps) {

    return (

        <div className="p-8 space-y-6">

                <h2 className="text-2xl font-semibold">
                    Ask your paper
                </h2>

                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Current paper
                    </p>

                    <p className="font-medium">
                        {uploadedFileName}
                    </p>
                </div>

                <Input
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <div className="flex flex-wrap gap-2">

                    {exampleQuestions.map((example) => (

                        <button
                            key={example}
                            type="button"
                            onClick={() => {
                                setQuestion(example);

                                setTimeout(() => {
                                    askQuestion(example);
                                }, 0);
                            }}
                            className="
                                rounded-full
                                border
                                px-3
                                py-1
                                text-sm
                                hover:bg-muted
                                transition
                            "
                        >
                            {example}
                        </button>

                    ))}

                </div>

                <Button
                    className="w-fit"
                    onClick={() => askQuestion()}
                    disabled={isAsking}
                >
                    {isAsking ? "Thinking..." : "Ask"}
                </Button>

        </div>

    );

}