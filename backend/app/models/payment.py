import uuid
from sqlalchemy import Float, String, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from .base import Base


class PaymentStatus(str):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    job_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("print_jobs.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    amount: Mapped[float] = mapped_column(Float, nullable=False)

    status: Mapped[str] = mapped_column(String, nullable=False)

    gateway_reference: Mapped[str] = mapped_column(String, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    job = relationship("PrintJob", back_populates="payment")# -*- coding: utf-8 -*-

