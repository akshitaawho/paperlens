import { Card, CardContent } from "@/components/ui/card";

type AnswerCardProps = {
    answer: string;
};

export default function AnswerCard({
    answer,
}: AnswerCardProps) {

    if (!answer) return null;

    return (

        <Card className="mt-8">

            <CardContent className="p-8">

                <h2 className="text-xl font-semibold mb-4">
                    Answer
                </h2>

                <p className="leading-7 whitespace-pre-wrap">
                    {answer}
                </p>

            </CardContent>

        </Card>

    );

}
