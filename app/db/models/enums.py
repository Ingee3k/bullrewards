from enum import Enum


class UserRole(str, Enum):
    PLAYER = "player"
    PARTNER = "partner"
    ADMIN = "admin"


class AccountStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"


class SessionStatus(str, Enum):
    STARTED = "started"
    COMPLETED = "completed"
    ABANDONED = "abandoned"
    SUSPICIOUS = "suspicious"