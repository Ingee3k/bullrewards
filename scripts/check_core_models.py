from app.db.base import Base
from app.db import models

expected = {
    "users",
    "player_wallets",
    "game_sessions",
    "points_ledger",
}

actual = set(Base.metadata.tables)
missing = expected - actual

if missing:
    raise SystemExit(f"Tabelle mancanti: {sorted(missing)}")

print("Modelli core caricati correttamente")
