from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hero text data
hero_texts = {
    "insights": "Discover Insights and Make Smart Investments",
    "about": "Join Us Now"
}

class PageRequest(BaseModel):
    page: str

# Endpoint to serve hero text
@app.post("/get-hero-text/")
async def get_hero_text(request: PageRequest) -> Dict:
    return {"hero_text": hero_texts.get(request.page, "Discover Insights and Make Smart Investments")}

# Root endpoint
@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}
