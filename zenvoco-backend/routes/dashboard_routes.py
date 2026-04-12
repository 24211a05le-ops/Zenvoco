from fastapi import APIRouter, Depends, HTTPException
from auth.jwt_handler import get_current_user_id
from database import users_collection, progress_collection, practice_collection, feedbacks_collection
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

@router.get("/platform/stats")
async def get_platform_stats():
    """
    Returns public aggregate statistics for the landing page.
    """
    total_users = await users_collection.count_documents({})
    total_sessions = await practice_collection.count_documents({})
    
    # Calculate average confidence score across all progress records
    pipeline = [
        {"$group": {"_id": None, "avg_confidence": {"$avg": "$confidence_score"}}}
    ]
    cursor = progress_collection.aggregate(pipeline)
    result = await cursor.to_list(length=1)
    
    avg_confidence = 0
    if result and result[0].get("avg_confidence") is not None:
        avg_confidence = round(result[0]["avg_confidence"], 1)
    
    return {
        "total_users": total_users,
        "total_sessions": total_sessions,
        "avg_confidence_improvement": avg_confidence,
        "satisfied_users_percent": await _calculate_satisfaction_percent()
    }

async def _calculate_satisfaction_percent():
    """
    Calculates the satisfaction percentage based on the ratio of positive reviews (4-5 stars).
    """
    total_feedbacks = await feedbacks_collection.count_documents({})
    if total_feedbacks == 0:
        return 0
        
    positive_feedbacks = await feedbacks_collection.count_documents({"rating": {"$gte": 4}})
    
    return round((positive_feedbacks / total_feedbacks) * 100)

@router.get("/feedbacks")
async def get_latest_feedbacks():
    """
    Returns the latest 6 feedbacks for the landing page.
    """
    cursor = feedbacks_collection.find().sort("created_at", -1).limit(6)
    feedbacks = await cursor.to_list(length=6)
    
    for f in feedbacks:
        f["_id"] = str(f["_id"])
        
    return feedbacks
