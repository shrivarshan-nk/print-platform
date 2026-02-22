from pydantic import BaseModel
from uuid import UUID
from app.schemas.base import BaseResponse
from app.core.constants import PaperSize, ColorMode


class PricingCreate(BaseModel):
    shop_id: UUID
    size: PaperSize
    color_mode: ColorMode
    normal_rate: float
    bulk_rate: float
    bulk_threshold: int


class PricingResponse(BaseResponse):
    shop_id: UUID
    size: PaperSize
    color_mode: ColorMode
    normal_rate: float
    bulk_rate: float
    bulk_threshold: int