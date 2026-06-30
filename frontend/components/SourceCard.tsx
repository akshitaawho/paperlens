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

                            <div className="flex items-center gap-2 mb-3">

                                {source.distance !== null ? (

                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                        Semantic Search
                                    </span>

                                ) : (

                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                        BM25
                                    </span>

                                )}

                                {source.distance !== null && (

                                    <span className="text-xs text-muted-foreground">
                                        Distance: {source.distance.toFixed(3)}
                                    </span>

                                )}

                            </div>
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