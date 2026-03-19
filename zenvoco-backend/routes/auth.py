from fastapi import APIRouter, HTTPException, status
from schemas.user_schema import UserCreate, UserLogin
from database import users_collection
from datetime import datetime
from bson import ObjectId

router = APIRouter()

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "college": user.get("college"),
        "created_at": user.get("created_at")
    }

@router.post("/register")
def register_user(user: UserCreate):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": user.password, # Note: using plain text password based on your database export for simplicity
        "college": user.college,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    result = users_collection.insert_one(new_user)
    created_user = users_collection.find_one({"_id": result.inserted_id})
    return {"message": "User Registered successfully", "user": user_helper(created_user)}

@router.post("/login")
def login_user(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or db_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"message": "User Logged In successfully", "user": user_helper(db_user)}

@router.get("/profile/{user_id}")
def get_profile(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid User ID format")
    db_user = users_collection.find_one({"_id": ObjectId(user_id)})
    if db_user:
        return user_helper(db_user)
    raise HTTPException(status_code=404, detail="User not found")