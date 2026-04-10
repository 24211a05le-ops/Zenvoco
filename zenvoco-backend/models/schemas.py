from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ================================
# Auth Request Schemas
# ================================
class UserRegisterRequest(BaseModel):
    name: str 
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {"name": "Test User", "email": "test@gmail.com", "password": "securepassword"}
        }

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {"email": "test@gmail.com", "password": "securepassword"}
        }

# ================================
# Models / Schemas Responses
# ================================
class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    name: Optional[str] = None

class PracticeSessionStartRequest(BaseModel):
    topic: str
    
class DailyTaskSubmit(BaseModel):
    task_id: str
    audio_path: str

class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    purpose: Optional[str] = None
    level: Optional[str] = None

class FeedbackCreate(BaseModel):
    comment: str
    rating: int = 5
