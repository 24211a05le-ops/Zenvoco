from fastapi import APIRouter, Depends, HTTPException
from auth.jwt_handler import get_current_user_id, get_password_hash
from database import users_collection, feedbacks_collection
from bson import ObjectId
from models.schemas import ProfileUpdateRequest, FeedbackCreate
from datetime import datetime

router = APIRouter(prefix="/user", tags=["User Profile"])


# GET USER PROFILE
@router.get("/profile")
async def get_profile(user_id: str = Depends(get_current_user_id)):

    user = await users_collection.find_one({"_id": ObjectId(user_id)})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])

    return {
        "id": user["_id"],
        "name": user.get("name"),
        "email": user.get("email"),
        "purpose": user.get("purpose"),
        "level": user.get("level")
    }


# UPDATE USER PROFILE
@router.put("/profile")
async def update_profile(data: ProfileUpdateRequest, user_id: str = Depends(get_current_user_id)):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    if "password" in update_data:
        update_data["password"] = get_password_hash(update_data["password"])

    await users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )

    return {"message": "Profile updated successfully"}


# SUBMIT FEEDBACK
@router.post("/feedback")
async def submit_feedback(data: FeedbackCreate, user_id: str = Depends(get_current_user_id)):
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    feedback_doc = {
        "user_id": user_id,
        "name": user["name"],
        "comment": data.comment,
        "rating": data.rating,
        "created_at": datetime.utcnow()
    }
    
    await feedbacks_collection.insert_one(feedback_doc)
    
    return {"message": "Feedback submitted successfully"}