from pydantic import BaseModel, EmailStr
from app.schemas.base import BaseResponse
from app.core.constants import UserRole


class UserCreate(BaseModel):
    campus_id: str
    email: EmailStr
    name: str
    role: UserRole


class UserResponse(BaseResponse):
    email: EmailStr
    name: str
    role: UserRole