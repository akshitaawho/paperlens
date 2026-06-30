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
    "What is the main contribution of this paper?",
    "Summarize the methodology.",
    "What are the limitations of this paper?",
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

                <p className="text-sm text-muted-foreground">
                    Ask questions about <span className="font-medium">{uploadedFileName}</span>
                </p>

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