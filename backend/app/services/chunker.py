# CHUNKING SERVICE
# Splits the document into one metadata chunk
# followed by regular fixed-size chunks.

def split_into_chunks(
    text,
    chunk_size=500
):

    chunks = []

    introduction_index = text.find("Introduction")

    if introduction_index == -1:
        introduction_index = text.find("INTRODUCTION")

    if introduction_index != -1:

        metadata_chunk = text[:introduction_index].strip()

        body_text = text[introduction_index:].strip()

        chunks.append(metadata_chunk)

    else:

        body_text = text

    words = body_text.split()

    for i in range(0, len(words), chunk_size):

        chunk = words[i:i + chunk_size]

        chunks.append(
            " ".join(chunk)
        )

    return chunks