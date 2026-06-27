import ollama


def generate_answer(question, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are a helpful AI research assistant.

Use ONLY the information below to answer the user's question.

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