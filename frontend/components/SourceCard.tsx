import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type SourceCardProps = {
    sources: {
        text: string;
        distance: number;
    }[];
};

export default function SourceCard({
    sources,
}: SourceCardProps) {

    if (sources.length === 0) return null;

    const [expandedChunk, setExpandedChunk] = useState<number | null>(null);

    return (

        <Card className="mt-8">

            <CardContent className="p-8">

                <h2 className="text-xl font-semibold mb-6">
                    Retrieved Sources
                </h2>

                <div className="space-y-4">

                    {sources.map((source, index) => (

                        <div
                            key={index}
                            className="rounded-lg border bg-muted/40 p-4 cursor-pointer"
                            onClick={() =>
                                setExpandedChunk(
                                    expandedChunk === index ? null : index
                                )
                            }
                        >

                            <p className="font-medium mb-2">
                                {expandedChunk === index ? "▼" : "▶"} Chunk {index + 1}
                            </p>

                            <p className="text-xs text-muted-foreground mb-3">
                                Distance: {source.distance.toFixed(3)}
                            </p>

                           <p className="text-sm whitespace-pre-wrap">
                                {expandedChunk === index
                                ? source.text
                                : `${source.text.substring(0, 200)}...`}
                            </p>

                        </div>

                    ))}

                </div>

            </CardContent>

        </Card>

    );

}