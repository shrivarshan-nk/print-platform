from pydantic import BaseModel
from uuid import UUID
from app.schemas.base import BaseResponse


class PaymentResponse(BaseResponse):
    job_id: UUID
    amount: float
    status: str