from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.schemas.base import BaseResponse


class CampusCreate(BaseModel):
    name: str
    location: str


class CampusUpdate(BaseModel):
    name: str | None = None
    location: str | None = None


class CampusResponse(BaseResponse):
    name: str
    location: str