from fastapi import FastAPI, UploadFile, File
import os
from app.services.pdf_reader import extract_text_from_pdf
from app.services.chunker import split_into_chunks

# Import CORS middleware
from fastapi.middleware.cors import CORSMiddleware


# CREATE FASTAPI APPLICATION
app = FastAPI(
    title="PaperLens API",
    description="Backend API for the PaperLens research assistant.",
    version="1.0.0"
)

# ENABLE CORS: This allows our React/Next.js frontend to communicate with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ROOT ENDPOINT
@app.get("/")
def home():
    return {
        "message": "PaperLens Backend Running!"
    }


# PDF UPLOAD ENDPOINT
@app.post("/upload")

async def upload_pdf(file: UploadFile = File(...)):

    # Create the file path where we'll save the PDF
    file_path = f"app/storage/papers/{file.filename}"

    # Save the uploaded PDF
    with open(file_path, "wb") as pdf_file:
        pdf_file.write(await file.read())

    # Extract text using our PDF reader service
    extracted_text = extract_text_from_pdf(file_path)

    # Split the extracted text into chunks
    chunks = split_into_chunks(extracted_text)

    # Return the result
    return {
        "filename": file.filename,
        "number_of_chunks": len(chunks),
        "chunks": chunks
    }