from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class StartSessionResponse(BaseModel):
    id: UUID
    status: str
    started_at: datetime


class CompleteSessionRequest(BaseModel):
    duration_seconds: int = Field(
        ge=1,
        le=3600,
    )
    score: int = Field(
        ge=0,
        le=1_000_000,
    )


class CompleteSessionResponse(BaseModel):
    session_id: UUID
    status: str
    score: int
    base_points: int
    awarded_points: int
    wallet_balance: int