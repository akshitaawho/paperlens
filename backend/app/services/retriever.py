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

def retrieve_chunks(query):

    # Convert the user's question into an embedding
    query_embedding = model.encode(query)

    # Search ChromaDB
    results = collection.query(

        query_embeddings=[query_embedding.tolist()],

        n_results=VECTOR_TOP_K,

        include=["documents", "distances"]

    )

    print(results["distances"][0])

    retrieved_chunks = []

    for rank, (document, distance) in enumerate(
        zip(
            results["documents"][0],
            results["distances"][0]
        ),
        start=1
    ):

        retrieved_chunks.append({

            "text": document,

            "distance": distance,

            "rrf_score": 1 / (60 + rank)

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


    return retrieved_chunks