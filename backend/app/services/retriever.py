from sentence_transformers import SentenceTransformer
import chromadb

# Load the same embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to the same database
client = chromadb.PersistentClient(path="app/chroma_db")

collection = client.get_or_create_collection(
    name="research_papers"
)

def retrieve_chunks(query):

    # Convert the user's question into an embedding
    query_embedding = model.encode(query)

    # Search ChromaDB
    results = collection.query(

        query_embeddings=[query_embedding.tolist()],

        # topk
        n_results=3

    )

    return results["documents"][0]