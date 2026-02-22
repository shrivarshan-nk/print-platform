"""Add unique constraints to campus name and shop name per campus

Revision ID: add_unique_constraints
Revises: add_created_at_shops
Create Date: 2026-02-22 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_unique_constraints'
down_revision = 'add_created_at_shops'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add unique constraint to campus.name
    op.create_unique_constraint('uq_campus_name', 'campuses', ['name'])
    
    # Add unique constraint to (shop.campus_id, shop.name)
    op.create_unique_constraint('uq_campus_id_shop_name', 'shops', ['campus_id', 'name'])


def downgrade() -> None:
    # Remove unique constraints
    op.drop_constraint('uq_campus_id_shop_name', 'shops', type_='unique')
    op.drop_constraint('uq_campus_name', 'campuses', type_='unique')
