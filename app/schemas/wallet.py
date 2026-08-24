from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class WalletResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    user_id: UUID
    available_points: int
    lifetime_earned_points: int
    lifetime_spent_points: int
    updated_at: datetime


class PointsLedgerEntryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    source_type: str
    source_id: UUID | None
    delta_points: int
    balance_after: int
    idempotency_key: str
    reason: str
    created_at: datetime