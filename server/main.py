# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import httpx
import asyncio
from logger import setup_logger
from ollama import Client
app = FastAPI()
api_logger = setup_logger("api")
request_logger = setup_logger("requests")
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_API = "http://localhost:11435"

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    model: str
    messages: List[Message]

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        client = Client(
            host='http://localhost:11434',
            headers={'x-some-header': 'some-value'}
                )
        response = client.chat(model=request.model, messages=[
            {
                    'role': 'user',
                    'content': 'Why is the sky blue?',
                },
            ])
            
        response.raise_for_status()
          
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Ollama API error: {str(e)}")

@app.get("/api/models")
async def get_models():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{OLLAMA_API}/api/tags")
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch models: {str(e)}")

# Optional: Add streaming support
@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{OLLAMA_API}/api/chat",
                json={
                    "model": request.model,
                    "messages": [msg.dict() for msg in request.messages],
                    "stream": True
                },
                headers={"Accept": "text/event-stream"}
            )
            response.raise_for_status()
            return response.iter_lines()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Streaming error: {str(e)}")