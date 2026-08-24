from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import PlayerWallet, PointsLedger, User
from app.db.session import get_db
from app.schemas.wallet import (
    PointsLedgerEntryResponse,
    WalletResponse,
)

router = APIRouter(
    prefix="/wallet",
    tags=["wallet"],
)


@router.get(
    "/me",
    response_model=WalletResponse,
)
def read_my_wallet(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    wallet = db.scalar(
        select(PlayerWallet).where(
            PlayerWallet.user_id == current_user.id
        )
    )

    if wallet is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wallet non trovato",
        )

    return wallet


@router.get(
    "/me/ledger",
    response_model=list[PointsLedgerEntryResponse],
)
def read_my_points_ledger(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = Query(default=20, ge=1, le=100),
):
    rows = db.scalars(
        select(PointsLedger)
        .where(PointsLedger.user_id == current_user.id)
        .order_by(PointsLedger.created_at.desc())
        .limit(limit)
    ).all()

    return rows