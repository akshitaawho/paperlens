# CHUNKING SERVICE
# This service splits large documents into smaller chunks that can later be converted into embeddings.
# Why? because LLMs and vector databases work much better with small pieces of text than one giant document.
# chunk size 500 means that each chunk has 500 words.
def split_into_chunks(text, chunk_size=500):

    # Store all chunks here
    chunks = []

    # Split the text into words
    words = text.split()

    # Create chunks of 'chunk_size' words
    for i in range(0, len(words), chunk_size):

        # Take a slice of words
        chunk = words[i:i + chunk_size]

        # Convert the list of words back into text
        chunk_text = " ".join(chunk)

        # Save this chunk
        chunks.append(chunk_text)

    return chunks