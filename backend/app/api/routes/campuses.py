from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.campus import Campus
from app.schemas.campus import CampusCreate, CampusUpdate, CampusResponse

router = APIRouter()


@router.post("/", response_model=CampusResponse)
def create_campus(data: CampusCreate, db: Session = Depends(get_db)):
    # Check if campus with same name already exists
    existing = db.query(Campus).filter(Campus.name == data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Campus with name '{data.name}' already exists")
    
    campus = Campus(**data.model_dump())
    db.add(campus)
    db.commit()
    db.refresh(campus)
    return campus


@router.get("/", response_model=List[CampusResponse])
def list_campuses(db: Session = Depends(get_db)):
    return db.query(Campus).all()


@router.patch("/{campus_id}", response_model=CampusResponse)
def update_campus(campus_id: UUID, data: CampusUpdate, db: Session = Depends(get_db)):
    campus = db.get(Campus, campus_id)
    if not campus:
        raise HTTPException(status_code=404, detail="Campus not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(campus, key, value)

    db.commit()
    db.refresh(campus)
    return campus


@router.delete("/{campus_id}")
def delete_campus(campus_id: UUID, db: Session = Depends(get_db)):
    campus = db.get(Campus, campus_id)
    if not campus:
        raise HTTPException(status_code=404, detail="Campus not found")

    db.delete(campus)
    db.commit()
    return {"message": "Campus deleted"}