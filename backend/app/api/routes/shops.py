from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.shop import Shop
from app.schemas.shop import ShopCreate, ShopUpdate, ShopResponse

router = APIRouter()


@router.post("/", response_model=ShopResponse)
def create_shop(data: ShopCreate, db: Session = Depends(get_db)):
    # Check if shop with same name already exists in this campus
    existing = db.query(Shop).filter(
        Shop.campus_id == data.campus_id,
        Shop.name == data.name
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Shop with name '{data.name}' already exists in this campus")
    
    shop = Shop(**data.model_dump())
    db.add(shop)
    db.commit()
    db.refresh(shop)
    return shop


@router.get("/", response_model=List[ShopResponse])
def list_shops(db: Session = Depends(get_db)):
    return db.query(Shop).all()


@router.patch("/{shop_id}", response_model=ShopResponse)
def update_shop(shop_id: UUID, data: ShopUpdate, db: Session = Depends(get_db)):
    shop = db.get(Shop, shop_id)
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(shop, key, value)

    db.commit()
    db.refresh(shop)
    return shop


@router.delete("/{shop_id}")
def delete_shop(shop_id: UUID, db: Session = Depends(get_db)):
    shop = db.get(Shop, shop_id)
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")

    db.delete(shop)
    db.commit()
    return {"message": "Shop deleted"}