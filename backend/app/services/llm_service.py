import ollama


def generate_answer(question, retrieved_chunks):

    context = ""

    for index, chunk in enumerate(
        retrieved_chunks,
        start=1
    ):

        context += f"""
    [Chunk {index}]
    {chunk["text"]}

    """

    prompt = f"""
    You are PaperLens, an AI assistant for understanding research papers.

    Answer ONLY using the provided context.

    If the answer cannot be found in the context, reply exactly:

    "I couldn't find enough information in the uploaded paper to answer that."

    Do not use outside knowledge.
    Do not invent facts.

    Whenever you use information from the context, cite the chunk number in square brackets.

    Example: [Chunk 2]

    Format every answer using this structure:

    Summary:
    (1-2 concise sentences)

    Key Points:
    - Point 1
    - Point 2
    - Point 3

    If there are fewer than three key points, include only the ones supported by the context.

    Context:
    {context}

    Question:
    {question}

    Answer:
    """

    response = ollama.chat(

        model="llama3.2",

        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response["message"]["content"]