# -*- coding: utf-8 -*-
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.payment import Payment
from app.schemas.payment import PaymentResponse

router = APIRouter()


@router.get("/", response_model=List[PaymentResponse])
def list_payments(db: Session = Depends(get_db)):
    return db.query(Payment).all()


@router.get("/{payment_id}", response_model=PaymentResponse)
def get_payment(payment_id: UUID, db: Session = Depends(get_db)):
    payment = db.get(Payment, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment
