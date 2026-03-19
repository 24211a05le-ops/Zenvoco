from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PracticeSessionCreate(BaseModel):
    user_id: str
    topic: str
    audio_file: str
    transcript: str

class SpeechAnalysisCreate(BaseModel):
    session_id: str
    confidence_score: int
    fluency_score: int
    clarity_score: int
    ai_feedback: str

class DailyTaskResponse(BaseModel):
    id: str
    title: str
    difficulty: str
    created_at: datetime
