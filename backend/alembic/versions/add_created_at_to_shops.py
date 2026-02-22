"""add created_at to shops table

Revision ID: add_created_at_shops
Revises: 93e6081a0562
Create Date: 2026-02-22 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'add_created_at_shops'
down_revision: Union[str, Sequence[str], None] = '93e6081a0562'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add created_at column to shops table."""
    op.add_column('shops', sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.func.now()))


def downgrade() -> None:
    """Remove created_at column from shops table."""
    op.drop_column('shops', 'created_at')
