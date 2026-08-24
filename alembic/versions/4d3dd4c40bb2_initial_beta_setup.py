"""initial beta setup

Revision ID: 4d3dd4c40bb2
Revises: 1d07fae77e0f
Create Date: 2026-08-22 00:05:10.785340

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4d3dd4c40bb2'
down_revision: Union[str, Sequence[str], None] = '1d07fae77e0f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
