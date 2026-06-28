import ollama


def generate_answer(question, retrieved_chunks):

    context = "\n\n".join(
        chunk["text"]
        for chunk in retrieved_chunks
    )

    prompt = f"""
    You are PaperLens, an AI assistant that helps users understand research papers.

    Answer ONLY using the provided context.

    If the answer cannot be found in the context, reply exactly:

    "I couldn't find enough information in the uploaded paper to answer that."

    Do not make up information.
    Do not use outside knowledge.
    Keep your answers clear and concise.

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