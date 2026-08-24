from fastapi import FastAPI

from app.api.v1.auth import router as auth_router

from app.api.v1.wallet import router as wallet_router

from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.game_sessions import router as game_sessions_router

app = FastAPI(
    title="Bull Rewards API",
    version="0.1.0",
)

app.include_router(
    auth_router,
    prefix="/api/v1",
)
app.include_router(
    game_sessions_router,
    prefix="/api/v1",
)
app.include_router(auth_router, prefix="/api/v1")
app.include_router(wallet_router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "Bull Rewards API attiva"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "environment": "local",
    }
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)