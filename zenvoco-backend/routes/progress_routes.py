from fastapi import APIRouter, Depends, HTTPException
from auth.jwt_handler import get_current_user_id
from database import progress_collection, users_collection
from bson import ObjectId

router = APIRouter(prefix="/progress", tags=["Progress Monitoring"])


@router.get("/")
async def retrieve_analytics_timeline(user_id: str = Depends(get_current_user_id)):
    """
    Returns the complete confidence score timeline of the logged-in user.
    Used for Chart.js / Recharts dashboard visualizations.
    """

    # 1️⃣ Verify user exists
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 2️⃣ Fetch progress records
    cursor = progress_collection.find(
        {"user_id": user_id}
    ).sort("date", 1).limit(60)

    records = await cursor.to_list(length=60)

    # 3️⃣ Convert ObjectId → string
    for row in records:
        row["_id"] = str(row["_id"])

    # 4️⃣ Prepare chart-friendly response
    timeline = [
        {
            "date": record.get("date"),
            "confidence_score": record.get("confidence_score", 0),
            "duration": record.get("duration", 0)
        }
        for record in records
    ]

    # 5️⃣ Latest confidence score
    latest_score = timeline[-1]["confidence_score"] if timeline else 0
    
    # 6️⃣ Calculate Average Duration
    avg_duration = 0
    if timeline:
        total_duration = sum(t.get("duration", 0) for t in timeline)
        avg_duration = total_duration // len(timeline)

    return {
        "user_id": user_id,
        "total_sessions": len(timeline),
        "latest_confidence_score": latest_score,
        "avg_duration": avg_duration,
        "timeline_metrics": timeline
    }