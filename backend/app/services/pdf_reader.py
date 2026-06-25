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