from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_app_title():
    assert app.title == "Bull Rewards API"


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "environment": "local",
    }

def test_docs_available(client):
    response = client.get("/docs")
    assert response.status_code == 200

def test_me_requires_authentication():
    response = client.get("/api/v1/auth/me")

    assert response.status_code == 401