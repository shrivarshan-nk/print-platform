from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.pricing import ShopPricing
from app.schemas.pricing import PricingCreate, PricingResponse

router = APIRouter()


@router.post("/", response_model=PricingResponse)
def create_pricing(data: PricingCreate, db: Session = Depends(get_db)):
    pricing = ShopPricing(**data.model_dump())
    db.add(pricing)
    db.commit()
    db.refresh(pricing)
    return pricing


@router.get("/{shop_id}", response_model=List[PricingResponse])
def list_pricing(shop_id: UUID, db: Session = Depends(get_db)):
    return db.query(ShopPricing).filter(ShopPricing.shop_id == shop_id).all()


@router.delete("/{pricing_id}")
def delete_pricing(pricing_id: UUID, db: Session = Depends(get_db)):
    pricing = db.get(ShopPricing, pricing_id)
    if not pricing:
        raise HTTPException(status_code=404, detail="Pricing not found")

    db.delete(pricing)
    db.commit()
    return {"message": "Pricing deleted"}