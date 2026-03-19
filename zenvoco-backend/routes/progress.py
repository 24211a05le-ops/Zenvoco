from fastapi import APIRouter, HTTPException
from database import progress_collection
from bson import ObjectId
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class ProgressCreate(BaseModel):
    user_id: str
    session_id: str
    confidence_score: int

@router.post("/")
def add_progress(progress: ProgressCreate):
    new_progress = progress.model_dump()
    new_progress["date"] = datetime.utcnow().isoformat() + "Z"
    result = progress_collection.insert_one(new_progress)
    return {"message": "Progress added", "id": str(result.inserted_id)}

@router.get("/{user_id}")
def get_user_progress(user_id: str):
    progress_records = []
    for p in progress_collection.find({"user_id": user_id}):
        progress_records.append({
            "id": str(p["_id"]),
            "session_id": p["session_id"],
            "confidence_score": p["confidence_score"],
            "date": p.get("date")
        })
    return progress_records