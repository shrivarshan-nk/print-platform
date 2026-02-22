# app/schemas/base.py

from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class BaseResponse(BaseModel):
    id: UUID
    created_at: datetime

    model_config = {
        "from_attributes": True  # allows ORM -> schema conversion
    }