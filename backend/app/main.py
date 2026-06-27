from fastapi import FastAPI, UploadFile, File
import os
from app.services.pdf_reader import extract_text_from_pdf
from app.services.chunker import split_into_chunks
from app.services.embedding_service import create_embeddings
from app.services.vector_store import store_chunks
from app.services.retriever import retrieve_chunks
from app.services.llm_service import generate_answer

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

    # Create embeddings for every chunk
    embeddings = create_embeddings(chunks)

    # Store chunks and embeddings inside ChromaDB
    store_chunks(chunks, embeddings)

    # Return the result
    return {
        "filename": file.filename,
        "number_of_chunks": len(chunks),
        "chunks": chunks
    }

# the frontend uses this endpoint to search for relevant chunks based on a user's query.
@app.get("/search")
def search(query: str):

    retrieved_chunks = retrieve_chunks(query)

    return {
        "query": query,
        "retrieved_chunks": retrieved_chunks
    }

# generates an answer based on the chunks
@app.get("/ask")
def ask(question: str):

    # Retrieve the most relevant chunks
    retrieved_chunks = retrieve_chunks(question)

    # Generate an answer using the LLM
    answer = generate_answer(
        question,
        retrieved_chunks
    )

    return {
        "question": question,
        "answer": answer,
        "retrieved_chunks": retrieved_chunks
    }