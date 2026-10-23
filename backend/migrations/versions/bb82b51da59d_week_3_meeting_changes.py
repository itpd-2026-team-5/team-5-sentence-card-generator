"""week 3 meeting changes

Revision ID: bb82b51da59d
Revises: d893c8f296af
Create Date: 2026-10-23 21:19:15.888134

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "bb82b51da59d"
down_revision: str | Sequence[str] | None = "d893c8f296af"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    col = sa.Column
    op.add_column("cards", col("highlight", sa.String(200), nullable=False, server_default=""))
    op.add_column("cards", col("instructions", sa.Text(), nullable=False, server_default=""))
    op.add_column(
        "cards", col("needs_regeneration", sa.Boolean(), nullable=False, server_default=sa.false())
    )
    op.add_column("cards", col("regenerations", sa.Integer(), nullable=False, server_default="0"))
    op.add_column("cards", col("teacher_checked_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("decks", col("description", sa.Text(), nullable=False, server_default=""))
    op.add_column("decks", col("known_language", sa.String(2), nullable=False, server_default="en"))
    op.add_column(
        "decks", col("target_language", sa.String(2), nullable=False, server_default="de")
    )
    op.add_column("decks", col("level", sa.String(2), nullable=False, server_default=""))
    op.add_column("decks", col("new_per_day", sa.Integer(), nullable=False, server_default="10"))
    op.add_column(
        "decks", col("reviews_per_day", sa.Integer(), nullable=False, server_default="200")
    )
    op.add_column("profiles", col("levels", sa.JSON(), nullable=False, server_default="{}"))
    op.add_column(
        "profiles", col("sentence_min_chars", sa.Integer(), nullable=False, server_default="0")
    )
    op.add_column("profiles", col("study_deck_ids", sa.JSON(), nullable=False, server_default="[]"))
    op.add_column(
        "profiles", col("cards_deleted", sa.Integer(), nullable=False, server_default="0")
    )
    op.add_column("texts", col("source_url", sa.String(500), nullable=False, server_default=""))
    op.add_column("texts", col("notes", sa.Text(), nullable=False, server_default=""))

    # The one level a learner had becomes their level in the language they were learning, every
    # existing deck takes the learner's language pair, and a card marked bad becomes archived.
    op.execute(
        "UPDATE profiles SET levels = json_build_object(target_language, level)"
        " WHERE level IS NOT NULL AND level <> ''"
    )
    op.execute(
        "UPDATE decks SET known_language = p.known_language, target_language = p.target_language"
        " FROM profiles p WHERE p.id = decks.profile_id"
    )
    op.execute("UPDATE cards SET status = 'archived' WHERE status = 'bad'")
    op.drop_column("profiles", "level")


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column("profiles", sa.Column("level", sa.String(2), nullable=False, server_default="A2"))
    op.execute("UPDATE profiles SET level = COALESCE(levels->>target_language, 'A2')")
    op.execute("UPDATE cards SET status = 'bad' WHERE status = 'archived'")
    for table, column in [
        ("texts", "notes"),
        ("texts", "source_url"),
        ("profiles", "cards_deleted"),
        ("profiles", "study_deck_ids"),
        ("profiles", "sentence_min_chars"),
        ("profiles", "levels"),
        ("decks", "reviews_per_day"),
        ("decks", "new_per_day"),
        ("decks", "level"),
        ("decks", "target_language"),
        ("decks", "known_language"),
        ("decks", "description"),
        ("cards", "teacher_checked_at"),
        ("cards", "regenerations"),
        ("cards", "needs_regeneration"),
        ("cards", "instructions"),
        ("cards", "highlight"),
    ]:
        op.drop_column(table, column)
