from sentence_transformers import SentenceTransformer

# EMBEDDING SERVICE
# "The optimizer used is Adam." becomes something like [0.124, -0.812, ..., 0.342  ]
# These vectors capture the semantic meaning of text and will later be stored in ChromaDB.
# Load the embedding model only once. Loading it every request would be very slow.
model = SentenceTransformer("all-MiniLM-L6-v2")


def create_embeddings(chunks):

    # Convert every chunk into a vector
    embeddings = model.encode(chunks)

    return embeddings