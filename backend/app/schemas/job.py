from pydantic import BaseModel
from uuid import UUID
from app.schemas.base import BaseResponse
from app.core.constants import (
    PaperSize,
    ColorMode,
    PrintStatus
)


class JobCreate(BaseModel):
    shop_id: UUID
    pages: int
    copies: int
    size: PaperSize
    color_mode: ColorMode


class JobResponse(BaseResponse):
    shop_id: UUID
    pages: int
    copies: int
    size: PaperSize
    color_mode: ColorMode
    final_price: float
    status: PrintStatus