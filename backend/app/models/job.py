import uuid
from sqlalchemy import (
    Integer,
    Float,
    Enum,
    ForeignKey,
    DateTime,
    String,
    JSON,
    Index
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from .base import Base
from app.core.constants import (
    PrintStatus,
    PaperSize,
    ColorMode,
    ExecutionMode,
    PaymentMode
)


class PrintJob(Base):
    __tablename__ = "print_jobs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    campus_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("campuses.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    shop_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("shops.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    file_url: Mapped[str] = mapped_column(String, nullable=False)
    original_filename: Mapped[str] = mapped_column(String, nullable=False)

    pages: Mapped[int] = mapped_column(Integer, nullable=False)
    copies: Mapped[int] = mapped_column(Integer, nullable=False)

    size: Mapped[PaperSize] = mapped_column(
        Enum(PaperSize),
        nullable=False
    )

    color_mode: Mapped[ColorMode] = mapped_column(
        Enum(ColorMode),
        nullable=False
    )

    final_price: Mapped[float] = mapped_column(Float, nullable=False)

    pricing_snapshot: Mapped[dict] = mapped_column(
        JSON,
        nullable=False
    )

    execution_mode_snapshot: Mapped[ExecutionMode] = mapped_column(
        Enum(ExecutionMode),
        nullable=False
    )

    payment_mode_snapshot: Mapped[PaymentMode] = mapped_column(
        Enum(PaymentMode),
        nullable=False
    )

    status: Mapped[PrintStatus] = mapped_column(
        Enum(PrintStatus),
        nullable=False,
        index=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Relationships
    campus = relationship("Campus", back_populates="jobs")
    shop = relationship("Shop", back_populates="jobs")
    user = relationship("User", back_populates="jobs")
    payment = relationship("Payment", back_populates="job", uselist=False)


# Index optimization
Index("ix_print_jobs_shop_status", PrintJob.shop_id, PrintJob.status)# -*- coding: utf-8 -*-

