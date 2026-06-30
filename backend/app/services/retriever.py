from sentence_transformers import SentenceTransformer
import chromadb
from app.services.bm25_service import search_bm25

# Load the same embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to the same database
client = chromadb.PersistentClient(path="app/chroma_db")

collection = client.get_or_create_collection(
    name="research_papers"
)

VECTOR_TOP_K = 3
BM25_TOP_K = 2

def retrieve_chunks(query, paper_id):

    # Convert the user's question into an embedding
    query_embedding = model.encode(query)

    # Search ChromaDB
    results = collection.query(

        query_embeddings=[query_embedding.tolist()],

        n_results=5,

        where={
            "paper_id": paper_id
        },

        include=[
            "documents",
            "distances",
            "metadatas"
        ]

    )

    retrieved_chunks = []

    for rank, (document, distance, metadata) in enumerate(
        zip(
            results["documents"][0],
            results["distances"][0],
            results["metadatas"][0]
        ),
        start=1
    ):

        retrieved_chunks.append({
            "text": document,

            "distance": distance,

            "rrf_score": 1 / (60 + rank),

            "paper_title": metadata["paper_title"],

            "paper_id": metadata["paper_id"],

            "chunk_number": metadata["chunk_number"]
        })

    bm25_chunks = search_bm25(
        query,
        top_k=BM25_TOP_K
    )

    for rank, chunk in enumerate(
        bm25_chunks,
        start=1
    ):

        existing_chunk = next(

            (
                item
                for item in retrieved_chunks
                if item["text"] == chunk
            ),

            None

        )

        if existing_chunk:

            existing_chunk["rrf_score"] += 1 / (60 + rank)

        else:

            retrieved_chunks.append({

                "text": chunk,

                "distance": None,

                "rrf_score": 1 / (60 + rank)

            })

    retrieved_chunks.sort(
        key=lambda chunk: chunk["rrf_score"],
        reverse=True
    )

    for chunk in retrieved_chunks:
        print("-----------------------")
        print(chunk.get("paper_title"))
        print(chunk.get("chunk_number"))
        print(chunk["text"][:120])

    return retrieved_chunks