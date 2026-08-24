from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class PlayerWallet(Base):
    __tablename__ = "player_wallets"

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
    )
    available_points: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    lifetime_earned_points: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    lifetime_spent_points: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="wallet")