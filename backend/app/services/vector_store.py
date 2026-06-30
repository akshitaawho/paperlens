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


def store_chunks(
    chunks,
    embeddings,
    metadata
):

    ids = []

    for item in metadata:

        ids.append(
            f'{item["paper_id"]}_chunk_{item["chunk_number"]}'
        )

    collection.add(

        ids=ids,

        documents=chunks,

        embeddings=embeddings.tolist(),

        metadatas=metadata

    )