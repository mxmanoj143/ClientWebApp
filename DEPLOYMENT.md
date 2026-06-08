# Vercel Deployment Guide — Revanth Concrete Products

## Architecture (After Migration)

```
┌─────────────────────────────────────────────────────────┐
│                       VERCEL                            │
│                                                         │
│  ┌──────────────────┐         ┌──────────────────────┐ │
│  │  Static Frontend │  /api/* │  Serverless Functions│ │
│  │  (React build)   │ ───────▶│   /api/contact.js    │ │
│  │                  │         │   /api/quote.js      │ │
│  │  /products/...   │         │   /api/career.js     │ │
│  │  /contact/...    │         └──────────┬───────────┘ │
│  └──────────────────┘                    │             │
└──────────────────────────────────────────┼─────────────┘
                                           │
                                           ▼
                                    ┌───────────────┐
                                    │  Resend HTTP  │  (your account)
                                    │     API       │
                                    └───────┬───────┘
                                            │
                                            ▼
                              enquiry.revanthconcrete@gmail.com

User clicks WhatsApp button ──▶  wa.me/917066004545  (client-side, no backend)
```

## What's Independent Now
| Component | Where | Emergent Required? |
|---|---|---|
| Static site (React build) | Vercel CDN | ❌ No |
| Contact form API | Vercel Serverless (`/api/contact`) | ❌ No |
| Quote form API | Vercel Serverless (`/api/quote`) | ❌ No |
| Career form API | Vercel Serverless (`/api/career`) | ❌ No |
| Email delivery | Resend (your account) | ❌ No |
| WhatsApp chat | `wa.me/...` click links (browser) | ❌ No |
| Domain + SSL | Vercel (auto) | ❌ No |

**If you cancel Emergent, the site continues to work without any change.**

## What Was Removed
- `REACT_APP_BACKEND_URL` dependency (frontend now uses relative `/api/*`)
- `Made with Emergent` badge from `index.html`
- PostHog analytics script from `index.html`
- `emergent-main.js` script tag from `index.html`
- MongoDB write logic (form data goes directly to your email; nothing stored)
- The old FastAPI backend in `/app/backend/` is now unused (you can delete it, or keep it for record)

## Deployment Steps

### 1) Push to GitHub
Click **"Save to Github"** in the Emergent chat input.

### 2) Create Vercel Project
1. Sign in at https://vercel.com → **Add New… → Project**
2. Import the GitHub repo you just pushed
3. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: leave default (`yarn build`)
   - **Output Directory**: leave default (`build`)

### 3) Set Environment Variables in Vercel
Go to **Project → Settings → Environment Variables** and add:

| Name | Value | Environment |
|---|---|---|
| `RESEND_API_KEY` | `re_MLmfUk91_4JDiRYtX5T7VHro1jkHyBNud` | Production, Preview, Development |
| `SENDER_EMAIL` | `onboarding@resend.dev`  *(or your verified domain sender)* | Production, Preview, Development |
| `NOTIFICATION_EMAILS` | `enquiry.revanthconcrete@gmail.com` *(comma-separated for multiple)* | Production, Preview, Development |

> **Sender email tip**: `onboarding@resend.dev` works for testing. For production with your custom domain, verify `revanthconcrete.com` in your Resend dashboard, then set `SENDER_EMAIL` to e.g. `enquiry@revanthconcrete.com` so emails come from your own domain (better deliverability + brand trust).

### 4) Deploy
Click **Deploy**. First build takes ~2–3 min.

### 5) Connect Custom Domain
1. Vercel → **Project → Settings → Domains**
2. Add `revanthconcrete.com` and `www.revanthconcrete.com`
3. Vercel will show DNS records — point your domain registrar's DNS to them
4. SSL provisions automatically within ~30 min

### 6) Verify After Deploy
Open `https://revanthconcrete.com` and test:
- [ ] Hero loads, all images render
- [ ] Navigate to any product detail (direct URL test)
- [ ] Submit Contact form → check `enquiry.revanthconcrete@gmail.com`
- [ ] Submit Quote form → check email
- [ ] WhatsApp float button opens chat
- [ ] Brochure PDF downloads
- [ ] Mobile view works

## Local Development After Migration
The Emergent preview will keep working because FastAPI backend still serves `/api/*`. You can continue using Emergent for dev/preview as long as you have a subscription.

After Vercel is live, the production site is fully independent.

## Cost Estimate (Vercel)
| Item | Free Tier Limit | Sufficient? |
|---|---|---|
| Bandwidth | 100 GB/month | ✅ Yes (~1000s of visitors) |
| Serverless Function invocations | 100,000/month | ✅ Yes (forms are low-volume) |
| Build minutes | 6,000/month | ✅ Yes |
| Custom domains + SSL | Unlimited | ✅ Yes |

**Resend free tier**: 3,000 emails/month — more than enough.

## Rollback
If anything goes wrong, Vercel keeps every deployment. Open the project → **Deployments** → click any previous deploy → **"Promote to Production"**. Zero downtime.
