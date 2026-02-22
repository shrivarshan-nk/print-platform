import uuid
from sqlalchemy import Float, Integer, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from app.core.constants import PaperSize, ColorMode


class ShopPricing(Base):
    __tablename__ = "shop_pricing"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    shop_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("shops.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    size: Mapped[PaperSize] = mapped_column(
        Enum(PaperSize),
        nullable=False
    )

    color_mode: Mapped[ColorMode] = mapped_column(
        Enum(ColorMode),
        nullable=False
    )

    normal_rate: Mapped[float] = mapped_column(Float, nullable=False)
    bulk_rate: Mapped[float] = mapped_column(Float, nullable=False)
    bulk_threshold: Mapped[int] = mapped_column(Integer, nullable=False)

    shop = relationship("Shop", back_populates="pricing")# -*- coding: utf-8 -*-

