from fastapi import APIRouter, Depends, UploadFile, File
from auth.jwt_handler import get_current_user_id
from services.speech_service import process_audio_transcription, process_generative_feedback
import os
import shutil

router = APIRouter(prefix="/speech", tags=["Speech Analysis"])

@router.post("/analyze")
async def process_speech_one_off(
    audio: UploadFile = File(...), 
    user_id: str = Depends(get_current_user_id)
):
    """
    Allows executing a Whisper -> Generative AI Feedback Pipeline evaluation without
    recording the payload into the central tracking system. Useful for Frontend "try it out" flows.
    """
    os.makedirs("uploads", exist_ok=True)
    tmp_path = f"uploads/tmp_{audio.filename}"
    
    with open(tmp_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)
        
    transcription = await process_audio_transcription(tmp_path)
    feedback_data = await process_generative_feedback(transcription)
    
    # Cleanup memory trace
    if os.path.exists(tmp_path):
        os.remove(tmp_path)
        
    return {
        "status": "success",
        "transcription_result": transcription,
        "feedback_object": feedback_data
    }
