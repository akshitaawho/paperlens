from fastapi import FastAPI

# Import CORS middleware
from fastapi.middleware.cors import CORSMiddleware

# ==================================================
# CREATE FASTAPI APPLICATION
# ==================================================

app = FastAPI(
    title="PaperLens API",
    description="Backend API for the PaperLens research assistant.",
    version="1.0.0"
)

# ==================================================
# ENABLE CORS
# This allows our React/Next.js frontend
# to communicate with the backend.
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================================================
# ROOT ENDPOINT
# ==================================================

@app.get("/")
def home():
    return {
        "message": "PaperLens Backend Running!"
    }