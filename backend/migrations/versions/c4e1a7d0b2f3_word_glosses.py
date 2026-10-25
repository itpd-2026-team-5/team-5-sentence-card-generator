"""word glosses

Revision ID: c4e1a7d0b2f3
Revises: bb82b51da59d
Create Date: 2026-10-25 15:00:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c4e1a7d0b2f3"
down_revision: str | Sequence[str] | None = "bb82b51da59d"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "text_words", sa.Column("gloss", sa.String(200), nullable=False, server_default="")
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("text_words", "gloss")
