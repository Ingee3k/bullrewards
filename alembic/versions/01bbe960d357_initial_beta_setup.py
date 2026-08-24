"""initial beta setup

Revision ID: 01bbe960d357
Revises: 4d3dd4c40bb2
Create Date: 2026-08-22 00:09:34.966305

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '01bbe960d357'
down_revision: Union[str, Sequence[str], None] = '4d3dd4c40bb2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
