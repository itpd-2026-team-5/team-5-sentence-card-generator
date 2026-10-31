"""Store each text's language for vocabulary isolation.

Revision ID: e51d8a70c923
Revises: c4e1a7d0b2f3
"""

import sqlalchemy as sa
from alembic import op

revision = "e51d8a70c923"
down_revision = "c4e1a7d0b2f3"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("texts", sa.Column("language", sa.String(2), nullable=True))
    # Old texts did not record a language. Prefer an unambiguous generated deck,
    # otherwise use the owner's current learning language; the text editor can correct it.
    op.execute(
        sa.text("""
        UPDATE texts SET language = COALESCE(
            (SELECT MIN(decks.target_language) FROM cards
             JOIN card_decks ON card_decks.card_id = cards.id
             JOIN decks ON decks.id = card_decks.deck_id
             WHERE cards.text_id = texts.id
             HAVING COUNT(DISTINCT decks.target_language) = 1),
            (SELECT profiles.target_language FROM profiles WHERE profiles.id = texts.profile_id)
        )
    """)
    )
    with op.batch_alter_table("texts") as batch:
        batch.alter_column("language", existing_type=sa.String(2), nullable=False)


def downgrade() -> None:
    op.drop_column("texts", "language")
