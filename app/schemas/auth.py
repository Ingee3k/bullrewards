from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RegisterRequest(BaseModel):
    display_name: str = Field(
        min_length=2,
        max_length=80,
    )
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=128,
    )
    terms_version: str = Field(
        min_length=1,
        max_length=40,
    )
    promo_consent: bool = False


class UserResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: UUID
    display_name: str
    email: EmailStr
    role: str
    status: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class MeResponse(UserResponse):
    created_at: datetime