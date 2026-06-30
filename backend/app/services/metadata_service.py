def is_metadata_question(question):

    question = question.lower()

    metadata_keywords = [

        "title",
        "author",
        "authors",
        "published",
        "publication",
        "year",
        "date",
        "doi",
        "arxiv",
        "pages"

    ]

    return any(
        keyword in question
        for keyword in metadata_keywords
    )