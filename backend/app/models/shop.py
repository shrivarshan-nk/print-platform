import uuid
from sqlalchemy import String, Boolean, Enum, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from .base import Base
from app.core.constants import ExecutionMode, PaymentMode


class Shop(Base):
    __tablename__ = "shops"
    __table_args__ = (
        UniqueConstraint('campus_id', 'name', name='uq_campus_id_shop_name'),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    campus_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("campuses.id", ondelete="CASCADE"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)

    execution_mode: Mapped[ExecutionMode] = mapped_column(
        Enum(ExecutionMode),
        nullable=False
    )

    payment_mode: Mapped[PaymentMode] = mapped_column(
        Enum(PaymentMode),
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationships
    campus = relationship("Campus", back_populates="shops")
    pricing = relationship("ShopPricing", back_populates="shop", cascade="all, delete")
    jobs = relationship("PrintJob", back_populates="shop")# -*- coding: utf-8 -*-

