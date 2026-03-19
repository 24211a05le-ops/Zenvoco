from fastapi import APIRouter, Depends, HTTPException
from auth.jwt_handler import get_current_user_id
from database import users_collection, progress_collection, practice_collection
from bson import ObjectId

router = APIRouter(prefix="/dashboard", tags=["Dashboard Initialization"])

@router.get("/user")
async def initialize_dashboard_metrics(user_id: str = Depends(get_current_user_id)):
    """
    High performance batch fetch query fetching explicitly nested mappings for the complete Frontend Overview screen.
    Includes: Core user logic validation, Progress plotting chunks & Practice history. 
    """
    # 1. User check
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="Account not found.")
        
    # 2. Progress plotting sequence limit chunk
    progress_cursor = progress_collection.find({"user_id": user_id}).sort("date", -1).limit(5)
    progress_records = await progress_cursor.to_list(length=5)
    
    # 3. Practice History sequence payload chunk
    session_cursor = practice_collection.find({"user_id": user_id}).sort("created_at", -1).limit(5)
    session_records = await session_cursor.to_list(length=5)
    
    # Fix ObjectId serialization mismatch
    for p in progress_records:
        p["_id"] = str(p["_id"])
    for s in session_records:
        s["_id"] = str(s["_id"])
        
    return {
        "user_profile": {
            "name": user["name"], 
            "email": user["email"],
        },
        "metrics_preview": progress_records,
        "history_preview": session_records
    }
