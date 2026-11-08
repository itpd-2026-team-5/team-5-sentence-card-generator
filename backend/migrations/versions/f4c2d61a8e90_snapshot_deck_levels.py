"""Save each existing deck's current generation level on the deck.

Revision ID: f4c2d61a8e90
Revises: e51d8a70c923
"""

import sqlalchemy as sa
from alembic import op

revision = "f4c2d61a8e90"
down_revision = "e51d8a70c923"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Existing empty levels inherited the learner's level. Preserve the value
    # each deck uses today before the application stops reading Settings for it.
    op.execute(
        sa.text("""
        UPDATE decks AS d
        SET level = COALESCE(NULLIF(p.levels ->> d.target_language, ''), 'A2')
        FROM profiles AS p
        WHERE p.id = d.profile_id AND d.level = ''
        """)
    )
    op.alter_column("decks", "level", existing_type=sa.String(2), server_default="A2")


def downgrade() -> None:
    # The original empty values cannot be identified after a learner edits a deck.
    op.alter_column("decks", "level", existing_type=sa.String(2), server_default="")
