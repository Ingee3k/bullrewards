# Implementazione step-by-step — Beta v1

## Step 1 — Creazione progetto

```bash
mkdir beta-v1
cd beta-v1
mkdir backend frontend docs
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install fastapi uvicorn[standard] sqlalchemy alembic psycopg[binary] pyjwt "pwdlib[argon2]" pydantic-settings python-multipart pytest httpx
```

## Step 2 — Database locale

```bash
docker compose up -d db
```

Configurare PostgreSQL con database `beta`, utente `beta` e password solo per ambiente locale.

## Step 3 — Migration

```bash
alembic init alembic
alembic revision -m "initial beta schema"
alembic upgrade head
```

Le migration devono essere il meccanismo ufficiale di modifica del database; non usare `create_all()` in produzione. Alembic documenta il flusso init, revision, upgrade e autogenerate.[web:86]

## Step 4 — Health check

Implementare:

```http
GET /health
```

Risposta:

```json
{"status":"ok","environment":"local","database":"ok"}
```

## Step 5 — Auth

Implementare in ordine:

1. hashing password;
2. registrazione;
3. login;
4. JWT access token;
5. dependency `get_current_user`;
6. dependency `require_role`;
7. logout lato client/session strategy.

FastAPI mostra un percorso ufficiale basato su OAuth2 password flow, JWT e password hashing; in produzione usare una chiave segreta casuale e non quella degli esempi.[web:73][web:82]

## Step 6 — Game flow

Endpoint minimi:

```http
POST /api/v1/game/sessions
POST /api/v1/game/sessions/{id}/complete
```

Il completamento deve verificare ownership, stato `started`, durata, score e idempotency key. Poi deve accreditare i punti tramite ledger e wallet nella stessa transazione.

## Step 7 — Wallet

Implementare prima il ledger e poi il saldo derivato/aggiornato transazionalmente. Ogni accredito o addebito deve avere:

- user id;
- delta punti;
- causale;
- source type/id;
- idempotency key;
- saldo dopo operazione.

## Step 8 — Rewards e coupon

Implementare:

1. catalogo premi;
2. verifica disponibilità;
3. lock wallet e reward;
4. addebito punti;
5. decremento stock;
6. generazione codice hashato;
7. emissione coupon;
8. risposta con codice leggibile una sola volta o token QR.

## Step 9 — Redemption

Implementare prima ricerca codice, poi conferma. La conferma deve usare lock sulla riga coupon e impedire un secondo riscatto.

## Step 10 — Admin

Costruire prima il backoffice operativo:

- partner;
- premi;
- campagne;
- coupon;
- redemption.

Dashboard KPI e grafici vengono dopo il completamento dei dati operativi.

## Step 11 — Analytics

Registrare gli eventi essenziali:

```text
signup_complete
login_success
game_start
game_end
points_awarded
reward_opt_in
coupon_issued
redemption_success
```

## Step 12 — Test

Test obbligatori:

- doppio accredito della stessa sessione;
- saldo insufficiente;
- doppio click sul riscatto;
- coupon già usato;
- coupon scaduto;
- partner non autorizzato;
- accesso a risorsa di altro utente;
- cap/cooldown reward.

## Step 13 — Release pilot

Prima del pilot:

- eseguire migration su ambiente beta;
- caricare seed demo;
- creare account admin e partner;
- verificare backup;
- testare endpoint con Swagger;
- eseguire scenario end-to-end;
- congelare versione `beta-0.1.0`.
