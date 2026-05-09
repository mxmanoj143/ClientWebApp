"""Backend API tests for Revanth Concrete Products."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://infra-build-2.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# -------- Health --------
def test_health(session):
    r = session.get(f"{API}/health", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert "email_configured" in data
    assert isinstance(data["email_configured"], bool)
    assert "notification_count" in data


def test_root(session):
    r = session.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# -------- Contact --------
def test_contact_create_and_list(session):
    payload = {
        "name": "TEST_Contact User",
        "email": "test_contact@example.com",
        "phone": "+919999999999",
        "subject": "TEST subject",
        "message": "TEST message body",
    }
    r = session.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["name"] == payload["name"]
    assert body["email"] == payload["email"]
    assert "id" in body and len(body["id"]) > 0
    assert "_id" not in body
    assert "created_at" in body

    # List
    lr = session.get(f"{API}/contact", timeout=20)
    assert lr.status_code == 200
    items = lr.json()
    assert isinstance(items, list)
    assert any(it["id"] == body["id"] for it in items)
    for it in items:
        assert "_id" not in it


def test_contact_invalid_email(session):
    r = session.post(f"{API}/contact", json={
        "name": "x", "email": "not-an-email", "phone": "1", "message": "m"
    }, timeout=15)
    assert r.status_code == 422


# -------- Quote --------
def test_quote_create_and_list(session):
    payload = {
        "name": "TEST_Quote User",
        "email": "test_quote@example.com",
        "phone": "+919876543210",
        "company": "TestCo",
        "product": "Paver Block",
        "quantity": "1000 sqft",
        "location": "Pune",
        "message": "TEST quote",
    }
    r = session.post(f"{API}/quote", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["product"] == payload["product"]
    assert body["company"] == "TestCo"
    assert "id" in body
    assert "_id" not in body

    lr = session.get(f"{API}/quote", timeout=20)
    assert lr.status_code == 200
    items = lr.json()
    assert any(it["id"] == body["id"] for it in items)
    for it in items:
        assert "_id" not in it


# -------- Career --------
def test_career_create(session):
    payload = {
        "name": "TEST_Career Applicant",
        "email": "test_career@example.com",
        "phone": "+911111111111",
        "position": "Production Engineer",
        "experience": "3 years",
        "message": "TEST application",
    }
    r = session.post(f"{API}/career", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["position"] == "Production Engineer"
    assert body["experience"] == "3 years"
    assert "id" in body
    assert "_id" not in body


def test_career_minimal(session):
    """Career with only required fields"""
    r = session.post(f"{API}/career", json={
        "name": "TEST_Minimal", "email": "min@example.com", "phone": "1234567890"
    }, timeout=20)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["position"] == ""
