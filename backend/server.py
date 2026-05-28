from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAILS = [e.strip() for e in os.environ.get('NOTIFICATION_EMAILS', '').split(',') if e.strip()]

app = FastAPI(title="Revanth Concrete Products API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------------- Models ----------------
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    subject: Optional[str] = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: Optional[str] = ""
    message: str


class QuoteSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = ""
    product: str
    quantity: Optional[str] = ""
    location: Optional[str] = ""
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuoteCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = ""
    product: str
    quantity: Optional[str] = ""
    location: Optional[str] = ""
    message: Optional[str] = ""


class CareerSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    position: Optional[str] = ""
    experience: Optional[str] = ""
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CareerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    position: Optional[str] = ""
    experience: Optional[str] = ""
    message: Optional[str] = ""


# ---------------- Helpers ----------------
def _build_html(title: str, fields: dict) -> str:
    rows = "".join(
        f"<tr><td style='padding:12px 16px;font-weight:600;background:#F5F7FA;color:#072B61;width:34%;border-bottom:1px solid #B0B7C3;'>{k}</td>"
        f"<td style='padding:12px 16px;color:#072B61;border-bottom:1px solid #B0B7C3;'>{v or '-'}</td></tr>"
        for k, v in fields.items()
    )
    return f"""
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #B0B7C3;border-radius:14px;overflow:hidden;">
      <div style="background:#072B61;padding:26px 30px;">
        <div style="color:#B0B7C3;font-size:11px;letter-spacing:3px;font-weight:700;text-transform:uppercase;">Revanth Concrete Products</div>
        <div style="color:#FFFFFF;font-size:22px;font-weight:800;margin-top:8px;">{title}</div>
        <div style="color:#B0B7C3;font-size:12px;margin-top:6px;">New Customer Enquiry Received</div>
      </div>
      <div style="padding:24px 30px;">
        <div style="font-size:13px;color:#475569;margin-bottom:12px;">Customer Details</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #B0B7C3;border-radius:8px;overflow:hidden;">{rows}</table>
        <div style="margin-top:22px;padding:14px 16px;background:#F5F7FA;border-left:4px solid #072B61;border-radius:6px;font-size:13px;color:#072B61;">
          <strong>Source:</strong> Website Contact / Quote Form<br/>
          <strong>Submitted On:</strong> {datetime.now(timezone.utc).strftime('%d %b %Y, %H:%M UTC')}
        </div>
        <p style="margin-top:22px;color:#475569;font-size:13px;line-height:1.6;">Please contact the customer at the earliest. This notification was generated automatically by revanthconcrete.com.</p>
      </div>
      <div style="background:#072B61;padding:14px 30px;color:#B0B7C3;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;text-align:center;">
        Shaping Strength · Delivering Trust
      </div>
    </div>
    """


async def _send_email(subject: str, html: str) -> Optional[str]:
    """Send notification email via Resend. Returns email id or None on failure (non-blocking)."""
    if not resend.api_key or not NOTIFICATION_EMAILS:
        logger.warning("Resend API key or notification emails not configured; skipping email send.")
        return None
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": NOTIFICATION_EMAILS,
            "subject": subject,
            "html": html,
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return None


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Revanth Concrete Products API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "email_configured": bool(resend.api_key),
        "notification_count": len(NOTIFICATION_EMAILS),
    }


@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(payload: ContactCreate):
    obj = ContactSubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)

    html = _build_html("New Enquiry – " + obj.name, {
        "Name": obj.name,
        "Phone Number": obj.phone,
        "Email Address": obj.email,
        "Subject": obj.subject,
        "Customer Message": obj.message,
    })
    await _send_email(f"New Enquiry – {obj.name}", html)
    return obj


@api_router.post("/quote", response_model=QuoteSubmission)
async def create_quote(payload: QuoteCreate):
    obj = QuoteSubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.quote_submissions.insert_one(doc)

    html = _build_html("New Enquiry – " + obj.name, {
        "Name": obj.name,
        "Phone Number": obj.phone,
        "Email Address": obj.email,
        "Company / Site": obj.company,
        "Product": obj.product,
        "Quantity": obj.quantity,
        "Location": obj.location,
        "Project Details": obj.message,
    })
    await _send_email(f"New Enquiry – {obj.name}", html)
    return obj


@api_router.post("/career", response_model=CareerSubmission)
async def create_career(payload: CareerCreate):
    obj = CareerSubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.career_submissions.insert_one(doc)

    html = _build_html("New Career Application", {
        "Name": obj.name,
        "Email": obj.email,
        "Phone": obj.phone,
        "Position": obj.position,
        "Experience": obj.experience,
        "Notes": obj.message,
    })
    await _send_email(f"New Career Application from {obj.name}", html)
    return obj


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contacts():
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for i in items:
        if isinstance(i.get('created_at'), str):
            i['created_at'] = datetime.fromisoformat(i['created_at'])
    return items


@api_router.get("/quote", response_model=List[QuoteSubmission])
async def list_quotes():
    items = await db.quote_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for i in items:
        if isinstance(i.get('created_at'), str):
            i['created_at'] = datetime.fromisoformat(i['created_at'])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
