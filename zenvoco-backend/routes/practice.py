from fastapi import APIRouter, HTTPException
from database import practice_collection, speech_collection, tasks_collection
from schemas.practice_schema import PracticeSessionCreate, SpeechAnalysisCreate
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.get("/tasks")
def get_daily_tasks():
    tasks = []
    for task in tasks_collection.find():
        tasks.append({
            "id": str(task["_id"]),
            "title": task["title"],
            "difficulty": task["difficulty"],
            "created_at": task.get("created_at")
        })
    return tasks

@router.post("/session")
def create_practice_session(session: PracticeSessionCreate):
    new_session = session.model_dump()
    new_session["created_at"] = datetime.utcnow().isoformat() + "Z"
    result = practice_collection.insert_one(new_session)
    return {"message": "Session recorded", "session_id": str(result.inserted_id)}

@router.post("/analysis")
def add_speech_analysis(analysis: SpeechAnalysisCreate):
    new_analysis = analysis.model_dump()
    result = speech_collection.insert_one(new_analysis)
    return {"message": "Analysis saved", "analysis_id": str(result.inserted_id)}

@router.get("/analysis/{session_id}")
def get_analysis(session_id: str):
    analysis = speech_collection.find_one({"session_id": session_id})
    if analysis:
        analysis["_id"] = str(analysis["_id"])
        return analysis
    raise HTTPException(status_code=404, detail="Analysis not found")
