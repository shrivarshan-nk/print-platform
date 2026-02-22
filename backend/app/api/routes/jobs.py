from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.job import PrintJob
from app.schemas.job import JobResponse

router = APIRouter()


@router.get("/", response_model=List[JobResponse])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(PrintJob).all()