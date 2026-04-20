Backend (Express + TypeScript) starter.

## Setup
1) Install dependencies:
```bash
cd backend
npm install
```

2) Configure environment:
- Create `backend/.env.local` with:
  - `DATABASE_URL` (Neon Postgres)
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `FRONTEND_ORIGIN=http://localhost:3000`
  - `SESSION_COOKIE_NAME=getza_session`
  - `SESSION_TTL_DAYS=30`
 - Optional: `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` to seed an initial admin
  - Optional: `PORT` (default 4000)

3) Apply database schema and seed starter data:
```bash
npx prisma migrate deploy
npm run prisma:seed
# Optional seeders:
# npm run seed:nda
# npm run seed:job-offer
```

4) Start the API:
```bash
npm run dev
```

## Endpoints
- `GET /api/health` → `{ ok: true }`
- `GET /api/products`, `GET /api/products/slug/:slug`
- `GET /api/templates`, `GET /api/templates/:templateId`
- Auth: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `POST /api/document-runs`, `GET /api/document-runs/:id`, `GET /api/document-runs` (auth required)
- `POST /api/checkout` (auth required; admin bypass allowed only when Developer Mode is on)
- `POST /api/webhooks/stripe` (raw body)
- Admin: `GET/PUT /api/admin/settings` (developerMode toggle), Public settings: `GET /api/settings/public`

## Notes
- Local CORS allows `http://localhost:3000`.
- Sessions are httpOnly cookies with SHA-256 hashed tokens stored in DB.
- In dev, mounted routes are logged on startup for quick verification.

## Database connectivity (Neon)
- Use the **direct** Neon connection string (no `-pooler`), with SSL required. Example:
```
DATABASE_URL="postgresql://user:pass@ep-xxxx.eu-west-2.aws.neon.tech/neondb?sslmode=require"
```
- Troubleshooting:
  - Verify env is loaded:
    ```
    node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
    ```
  - Check connectivity:
    ```
    npx prisma migrate deploy
    ```
  - Ensure network allows outbound TLS to Neon and `sslmode=require` is set.
