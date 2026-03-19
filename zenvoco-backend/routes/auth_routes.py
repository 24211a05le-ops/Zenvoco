from fastapi import APIRouter, HTTPException, status
from models.schemas import UserRegisterRequest, UserLoginRequest, UserResponse, TokenResponse
from database import users_collection
from auth.jwt_handler import get_password_hash, verify_password, create_access_token
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
async def register(user: UserRegisterRequest):
    print("Register request received:", user.email)
    """
    Registers the user into the database, validates uniqueness, and hashes their payload string.
    """
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already claimed.")
    
    # Store explicit dictionary conversion mapped to PyMongo insertion
    user_dict = user.model_dump()
    user_dict["password"] = get_password_hash(user_dict["password"])
    user_dict["created_at"] = datetime.utcnow()
    
    result = await users_collection.insert_one(user_dict)
    
    return {
        "id": str(result.inserted_id),
        "name": user.name,
        "email": user.email,
        "created_at": user_dict["created_at"]
    }

@router.post("/login")
async def login(user: UserLoginRequest):
    """
    Verifies user payload credentials and securely issues a generated JWT token.
    """
    db_user = await users_collection.find_one({"email": user.email})
    
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Error credentials are not correct."
        )
        
    token = create_access_token({"sub": str(db_user["_id"])})
    return { 
        "access_token": token,
        "token_type": "bearer",
        "name": db_user["name"]
    }
