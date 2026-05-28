# Revanth Concrete Products — PRD

## Original Problem Statement
Create a premium modern corporate website for an infrastructure and concrete manufacturing company (Revanth Concrete Products). React + Tailwind, mobile-first, framer-motion animations, WhatsApp integration, Request Quotation / Contact forms, industrial color theme (Deep Corporate Navy `#072B61` + Metallic Silver `#B0B7C3`).

## Core Stack
- Frontend: React + Tailwind + Framer Motion + React Router
- Backend: FastAPI + MongoDB
- Email: Resend (sender: `enquiry.revanthconcrete@gmail.com`)
- WhatsApp: Click-to-chat URL scheme
- Images: Statically bundled in `/app/frontend/public/assets/products/` (108 product images)

## Pages Implemented
Home (hero slider + categories), About, Services, Products (40 SKUs in categories), CategoryPage, Gallery (127 images), Careers, Contact (Quote + Contact + Career tabs)

## Key Routes
- `POST /api/contact` — contact form → Resend + Mongo
- `POST /api/quote` — quote request → Resend + Mongo
- `POST /api/career` — career application → Resend + Mongo

## Completed (Feb 2026)
- 2026-02-28: Fixed Home slider top-crop (`pt-20 sm:pt-24` so hero image isn't hidden behind fixed navbar)
- 2026-02-28: Fixed Gallery page — now renders 127 product images via `buildGallery()` over `PRODUCTS` + `getProductImages()`
- 2026-02-28: Added "Product Brochure" button on Home bottom CTA linking to Google Drive
- 2026-02-28: Split "Grass Pavers" into two products: `set-of-5` (Set of 5) and `grass-pavers` (Grass Pavers); both temporarily share Set-Of-5 images until dedicated grass-paver photos are supplied
- 2026-02-28: Removed `RCC-Hume-Pipe-4.jpeg` from the hume-pipes image mapping
- 2026-02-28: Fixed syntax error in `productImages.js` (stray duplicate `getProductImages` export line)
- Earlier: Resend email integration, Theme overhaul (Navy + Silver), Bundled product images, Removed image uploader (deployment-safe), WhatsApp click-to-chat

## P1 Backlog / Open Items
- User to supply dedicated **Grass Pavers** photographs (current placeholder uses Set-Of-5 images). Drop them in `/app/frontend/public/assets/products/` and update the `"grass-pavers"` entry in `productImages.js`.

## P2 / Future Enhancements
- SEO meta + Open Graph tags per page
- Sitemap.xml + robots.txt for organic discovery
- Schema.org `Organization` / `Product` structured data
- Blog / project case-study section

## Critical Rules for Future Agents
- Do **not** rebuild an image uploader — keep images statically bundled
- Strict color palette: `#072B61` navy, `#B0B7C3` silver; **no** orange/yellow
- Resend API key is in `/app/backend/.env`; do not commit/rotate without user approval
