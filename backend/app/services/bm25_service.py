from rank_bm25 import BM25Okapi

bm25 = None
documents = []


def build_bm25(chunks):

    global bm25
    global documents

    documents = chunks

    tokenized_chunks = [
        chunk.split()
        for chunk in chunks
    ]

    bm25 = BM25Okapi(tokenized_chunks)


def search_bm25(query, top_k=5):

    if bm25 is None:
        return []

    tokenized_query = query.split()

    scores = bm25.get_scores(tokenized_query)

    ranked_indices = sorted(
        range(len(scores)),
        key=lambda i: scores[i],
        reverse=True
    )[:top_k]

    return [
        documents[i]
        for i in ranked_indices
    ]