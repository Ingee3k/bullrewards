# Struttura backend FastAPI — Beta v1

## Stack

- FastAPI per API e OpenAPI.
- SQLAlchemy 2.0 per ORM.
- Alembic per migration.
- PostgreSQL per beta condivisa; SQLite solo per sviluppo locale rapido.
- PyJWT e pwdlib/Argon2 per autenticazione e hashing.
- Pytest per test.

FastAPI documenta l’integrazione OAuth2/JWT e la generazione automatica della documentazione OpenAPI; SQLAlchemy 2.0 fornisce il modello ORM moderno; Alembic gestisce versionamento e applicazione delle migration.[web:73][web:76][web:86]

## Struttura repository

```text
beta-v1/
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ core/
│  │  │  ├─ config.py
│  │  │  ├─ security.py
│  │  │  └─ errors.py
│  │  ├─ db/
│  │  │  ├─ session.py
│  │  │  ├─ base.py
│  │  │  └─ models/
│  │  ├─ schemas/
│  │  ├─ repositories/
│  │  ├─ services/
│  │  │  ├─ auth_service.py
│  │  │  ├─ game_service.py
│  │  │  ├─ wallet_service.py
│  │  │  ├─ reward_service.py
│  │  │  └─ redemption_service.py
│  │  └─ api/
│  │     └─ v1/
│  │        ├─ auth.py
│  │        ├─ game.py
│  │        ├─ wallet.py
│  │        ├─ rewards.py
│  │        ├─ coupons.py
│  │        ├─ redemptions.py
│  │        └─ admin.py
│  ├─ alembic/
│  ├─ tests/
│  ├─ pyproject.toml
│  └─ .env.example
├─ frontend/
├─ docs/
└─ docker-compose.yml
```

## Comandi iniziali

```bash
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install fastapi uvicorn[standard] sqlalchemy alembic psycopg[binary] \
  pyjwt pwdlib[argon2] pydantic-settings python-multipart pytest httpx
uvicorn app.main:app --reload
```

Swagger sarà disponibile su `/docs` e lo schema OpenAPI su `/openapi.json`.[web:73]

## Configurazione minima

```env
APP_ENV=local
DATABASE_URL=postgresql+psycopg://beta:beta@localhost:5432/beta
JWT_SECRET_KEY=generare_con_openssl_rand_hex_32
JWT_ALGORITHM=HS256
ACCESS_TOKEN_MINUTES=30
CORS_ORIGINS=http://localhost:5173
```

Non committare `.env`; mantenere solo `.env.example`.

## Dipendenze di implementazione

1. Configurazione e logging.
2. Sessione DB e Base SQLAlchemy.
3. Modelli e migration Alembic.
4. Auth, hashing e ruoli.
5. Game session e wallet ledger.
6. Reward/coupon/redemption.
7. Analytics e admin.
8. Test e deployment.

## Regole architetturali

- I router validano input e autorizzazioni.
- I service applicano regole di dominio e transazioni.
- I repository isolano query persistenti.
- I modelli SQLAlchemy non devono contenere logica HTTP.
- Le operazioni punti/coupon/redemption devono essere atomiche.
- Ogni operazione mutabile sensibile deve supportare idempotenza.
