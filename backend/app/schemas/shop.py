from pydantic import BaseModel
from uuid import UUID
from app.schemas.base import BaseResponse
from app.core.constants import ExecutionMode, PaymentMode


class ShopCreate(BaseModel):
    campus_id: UUID
    name: str
    execution_mode: ExecutionMode
    payment_mode: PaymentMode


class ShopUpdate(BaseModel):
    name: str | None = None
    execution_mode: ExecutionMode | None = None
    payment_mode: PaymentMode | None = None
    is_active: bool | None = None


class ShopResponse(BaseResponse):
    campus_id: UUID
    name: str
    execution_mode: ExecutionMode
    payment_mode: PaymentMode
    is_active: bool