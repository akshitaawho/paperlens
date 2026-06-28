"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatSectionProps = {
    question: string;
    setQuestion: (question: string) => void;
    askQuestion: () => void;
    isAsking: boolean;
};

export default function ChatSection({
    question,
    setQuestion,
    askQuestion,
    isAsking,
}: ChatSectionProps) {

    return (

        <div className="p-8 space-y-6">

                <h2 className="text-2xl font-semibold">
                    Ask your paper
                </h2>

                <Input
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <Button
                    className="w-fit"
                    onClick={askQuestion}
                    disabled={isAsking}
                >
                    {isAsking ? "Thinking..." : "Ask"}
                </Button>

        </div>

    );

}