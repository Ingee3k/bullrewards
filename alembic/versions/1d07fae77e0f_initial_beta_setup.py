"""initial beta setup

Revision ID: 1d07fae77e0f
Revises: 1d3b37a1a467
Create Date: 2026-08-21 23:57:55.140547

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1d07fae77e0f'
down_revision: Union[str, Sequence[str], None] = '1d3b37a1a467'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
