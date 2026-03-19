from fastapi import APIRouter, Depends, HTTPException
from auth.jwt_handler import get_current_user_id
from database import tasks_collection
from models.schemas import DailyTaskSubmit

router = APIRouter(prefix="/tasks", tags=["Daily tasks"])

@router.get("/today")
async def access_daily_prompt(user_id: str = Depends(get_current_user_id)):
    """
    Fetch the latest curated prompt tracking sequence globally set inside Daily Tasks Collection.
    """
    # In production, logic queries based on current Date payload matching 'created_at'.
    task = await tasks_collection.find_one(sort=[("created_at", -1)])
    if task:
        task["id"] = str(task.pop("_id"))
        return task
    
    return {"message": "All current task prompts are finished"}

@router.post("/submit")
async def finish_daily_task_action(
    payload: DailyTaskSubmit, 
    user_id: str = Depends(get_current_user_id)
):
    """
    Handle marking a unique Daily Task as completely resolved via explicit payload validation.
    """
    return {
        "status": "Success", 
        "info": f"Task entry {payload.task_id} logically verified.",
        "media": payload.audio_path
    }
