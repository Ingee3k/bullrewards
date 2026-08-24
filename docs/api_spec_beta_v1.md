# API specification — Beta v1

Base URL: `/api/v1`

## Standards

- JSON request/response.
- UUID identifiers.
- Timestamps ISO-8601 UTC.
- Authenticated requests use an HTTP-only secure session cookie or bearer token.
- Mutating requests for points, coupon and redemption require `Idempotency-Key`.
- Error envelope: `{ "code": "string", "message": "string", "details": {} }`.
- Pagination: `limit` and `cursor`, with maximum limit 100.

## Authentication

| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| POST | `/auth/register` | public | Create player |
| POST | `/auth/login` | public | Start session |
| POST | `/auth/logout` | authenticated | End session |
| GET | `/auth/me` | authenticated | Current user |
| POST | `/auth/password-reset` | public | Reset access |

### `POST /auth/register`

Request:
```json
{"display_name":"Mario","email":"mario@example.com","password":"...","terms_version":"v1","promo_consent":false}
```

Response `201`:
```json
{"id":"uuid","display_name":"Mario","role":"player","status":"active"}
```

## Player endpoints

| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| GET | `/me/profile` | player | Profile |
| PATCH | `/me/profile` | player | Update profile/preferences |
| GET | `/me/home` | player | Home aggregate |
| GET | `/me/wallet` | player | Balance and ledger |
| GET | `/missions/today` | player | Daily missions |
| POST | `/missions/{id}/claim` | player | Claim mission reward |
| GET | `/game/config` | player | Game configuration |
| POST | `/game/sessions` | player | Start session |
| POST | `/game/sessions/{id}/complete` | player | Submit result |
| GET | `/sponsor-campaigns/available` | player | Available campaigns |
| POST | `/sponsor-campaigns/{id}/opt-in` | player | Activate demo/sponsor reward |
| GET | `/rewards` | player | Catalog |
| GET | `/rewards/{id}` | player | Reward detail |
| POST | `/rewards/{id}/redeem` | player | Spend points and issue coupon |
| GET | `/me/coupons` | player | Own coupons |
| GET | `/me/coupons/{id}` | player | Coupon detail |

## Partner/admin endpoints

| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| GET | `/admin/dashboard` | admin | KPI and funnel |
| GET | `/admin/partners` | admin | List partners |
| POST | `/admin/partners` | admin | Create partner |
| PATCH | `/admin/partners/{id}` | admin | Update partner |
| GET | `/admin/campaigns` | admin | List campaigns |
| POST | `/admin/campaigns` | admin | Create campaign |
| PATCH | `/admin/campaigns/{id}` | admin | Update/pause campaign |
| GET | `/admin/rewards` | admin | List rewards |
| POST | `/admin/rewards` | admin | Create reward |
| PATCH | `/admin/rewards/{id}` | admin | Update reward |
| GET | `/admin/coupons` | admin/partner | Search coupons |
| POST | `/redemptions/verify` | admin/partner | Verify code/token |
| POST | `/redemptions/{coupon_id}/confirm` | admin/partner | Redeem once |
| GET | `/admin/redemptions` | admin/partner | Redemption history |
| GET | `/admin/users` | admin | User list |
| GET | `/admin/events` | admin | Event log |
| GET | `/admin/export` | admin | CSV export |

## Core transaction rules

### Complete game session

1. Authenticate user and load session.
2. Check session belongs to current user.
3. Check status is `started`.
4. Validate duration and score limits.
5. Mark session completed.
6. Create ledger entry with unique idempotency key.
7. Update wallet atomically.
8. Emit analytics event.

### Redeem reward

1. Authenticate player.
2. Lock reward row for update.
3. Check reward active, not expired and stock available.
4. Lock wallet row for update.
5. Check available points.
6. Decrease wallet and stock.
7. Create coupon with hashed code/token.
8. Create ledger debit.
9. Commit transaction.
10. Emit `coupon_issued` event.

### Confirm redemption

1. Authenticate partner/admin.
2. Resolve code/token hash.
3. Check partner authorization.
4. Lock coupon row for update.
5. Check status is `issued` and date valid.
6. Create unique redemption record.
7. Set coupon status `redeemed`.
8. Commit transaction.
9. Emit `redemption_success` event.

## Error codes

| HTTP | Code | Meaning |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Input non valido |
| 401 | `AUTH_REQUIRED` | Autenticazione assente/errata |
| 403 | `FORBIDDEN` | Ruolo o ownership non autorizzati |
| 404 | `NOT_FOUND` | Risorsa non trovata |
| 409 | `CONFLICT` | Stato incompatibile o duplicato |
| 409 | `INSUFFICIENT_POINTS` | Saldo insufficiente |
| 409 | `REWARD_UNAVAILABLE` | Premio esaurito/scaduto/non attivo |
| 409 | `COUPON_ALREADY_REDEEMED` | Coupon già usato |
| 429 | `RATE_LIMITED` | Troppe richieste |
| 500 | `INTERNAL_ERROR` | Errore inatteso |

## Security requirements

- Object-level authorization su ogni endpoint che riceve un ID.
- Function-level authorization per admin e partner.
- Whitelist dei campi modificabili per ruolo.
- Rate limit su login, game completion, opt-in e redemption.
- Non restituire password hash, token grezzi o dati non necessari.
- Loggare accessi negati e operazioni sensibili.

Queste misure rispondono ai rischi API di broken object-level authorization, broken authentication, broken function-level authorization e unrestricted resource consumption identificati da OWASP.[web:57][web:59]
