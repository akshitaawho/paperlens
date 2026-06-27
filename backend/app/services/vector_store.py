import chromadb

# VECTOR DATABASE SERVICE
# This service stores embeddings and retrieves them later using semantic similarity.
# ChromaDB stores: Chunk Text + Embedding together.

# Create a persistent database
client = chromadb.PersistentClient(path="app/chroma_db")


# Create (or load) a collection
collection = client.get_or_create_collection(
    name="research_papers"
)


def store_chunks(chunks, embeddings):

    ids = []

    # Create unique IDs for every chunk
    for i in range(len(chunks)):
        ids.append(str(i))

    collection.add(

        ids=ids,

        documents=chunks,

        embeddings=embeddings.tolist()

    )