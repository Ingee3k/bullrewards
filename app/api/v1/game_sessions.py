from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import (
    GameSession,
    PlayerWallet,
    PointsLedger,
    SessionStatus,
    User,
)
from app.db.session import get_db
from app.schemas.game import (
    CompleteSessionRequest,
    CompleteSessionResponse,
    StartSessionResponse,
)

router = APIRouter(
    prefix="/game-sessions",
    tags=["game-sessions"],
)


@router.post(
    "/start",
    response_model=StartSessionResponse,
    status_code=status.HTTP_201_CREATED,
)
def start_session(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    session = GameSession(
        user_id=current_user.id,
        status=SessionStatus.STARTED,
    )

    db.add(session)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    db.refresh(session)
    return session


@router.post(
    "/{session_id}/complete",
    response_model=CompleteSessionResponse,
)
def complete_session(
    session_id: UUID,
    payload: CompleteSessionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    session = db.scalar(
        select(GameSession).where(
            GameSession.id == session_id,
            GameSession.user_id == current_user.id,
        )
    )

    if session is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sessione non trovata",
        )

    if session.status != SessionStatus.STARTED:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Sessione già completata o non valida",
        )

    wallet = db.scalar(
        select(PlayerWallet)
        .where(PlayerWallet.user_id == current_user.id)
        .with_for_update()
    )

    if wallet is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wallet non trovato",
        )

    base_points = min(payload.score // 100, 100)
    awarded_points = base_points

    session.status = SessionStatus.COMPLETED
    session.ended_at = func.now()
    session.duration_seconds = payload.duration_seconds
    session.score = payload.score
    session.base_points = base_points

    wallet.available_points += awarded_points
    wallet.lifetime_earned_points += awarded_points

    ledger = PointsLedger(
        user_id=current_user.id,
        source_type="game_session",
        source_id=session.id,
        delta_points=awarded_points,
        balance_after=wallet.available_points,
        idempotency_key=f"game-session:{session.id}",
        reason="Punti ottenuti dalla sessione di gioco",
    )

    db.add(ledger)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return CompleteSessionResponse(
        session_id=session.id,
        status=session.status.value,
        score=payload.score,
        base_points=base_points,
        awarded_points=awarded_points,
        wallet_balance=wallet.available_points,
    )