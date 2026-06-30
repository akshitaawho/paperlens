import fitz

# PDF READER SERVICE
# This file is responsible for reading PDF documents and extracting all text from every page.
# It does NOT know anything about FastAPI. It just extracts text from the PDF and returns as a string
def extract_text_from_pdf(pdf_path):

    # This variable will store the complete text
    full_text = ""

    # Open the PDF document
    document = fitz.open(pdf_path)

    # Loop through every page
    for page in document:

        # Extract text from the current page
        page_text = page.get_text()

        # Add it to the complete document text
        full_text += page_text + "\n"

    # Close the PDF to free memory
    document.close()

    # Return the extracted text
    return full_text

def extract_paper_title(pdf_path):

    document = fitz.open(pdf_path)

    first_page = document[0]

    blocks = first_page.get_text("dict")["blocks"]

    candidates = []

    for block in blocks:

        if "lines" not in block:
            continue

        block_text = []
        largest_size = 0
        y_position = None

        for line in block["lines"]:

            for span in line["spans"]:

                text = span["text"].strip()

                if len(text) < 5:
                    continue

                block_text.append(text)

                largest_size = max(largest_size, span["size"])

                if y_position is None:
                    y_position = span["bbox"][1]

        if block_text:

            candidates.append({

                "text": " ".join(block_text),

                "size": largest_size,

                "y": y_position

            })

    document.close()

    candidates = [
        c for c in candidates
        if "arxiv" not in c["text"].lower()
        and "[cs." not in c["text"].lower()
    ]

    candidates.sort(
        key=lambda c: (c["y"], -c["size"])
    )

    if candidates:
        return candidates[0]["text"]

    return ""