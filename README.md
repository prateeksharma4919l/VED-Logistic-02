# Ved Logistics

Ved Logistics is a full-stack DTDC-partner workspace for admin and employee operations. It includes attendance, salary, advance payments, payment history, reports, PDF export, and a premium static preview for business presentation.

This repo also includes a polished static preview inside `frontend/public/preview/` so the project can be shown both as a working app and as a premium service profile.

## Stack

- Frontend: Next.js 14, TypeScript
- Backend: Express, TypeScript
- Database: PostgreSQL
- Deployment: Render-ready Docker web service with Blueprint-managed PostgreSQL

## What Changed

This project is now configured for PostgreSQL instead of MongoDB.

- Backend data access now uses PostgreSQL tables and SQL queries
- Local development uses PostgreSQL via `docker-compose.yml`
- Render deployment uses a single Docker web service with `DATABASE_URL`
- Salary logic is monthly salary based, with approved advances deducted automatically

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Use the root `.env` file for backend env vars.

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vedlogistics
JWT_SECRET=change-me
DISABLE_DAILY_SUMMARY=true
PORT=4000
API_INTERNAL_PORT=4000
NEXT_PUBLIC_API_URL=/api
```

### 3. Start PostgreSQL

```bash
npm run db:up
```

This starts PostgreSQL on `postgresql://postgres:postgres@127.0.0.1:5432/vedlogistics`.

### 4. Run the app

```bash
npm run dev
```

Frontend:

- `http://localhost:3000`

Backend:

- `http://localhost:4000/api/health`

### 5. Seed default users

```bash
curl -X POST http://localhost:4000/api/auth/seed
```

Default accounts:

- Admin: `admin` or `admin@vedlogistics.com` / `admin123`
- Employee: `employee01` or `employee@vedlogistics.com` / `admin123`
- Rider: `rider01` or `rider@vedlogistics.com` / `admin123`

## Docker Build

Build locally:

```bash
docker build -t ved-logistics-postgres .
```

Run locally:

```bash
docker run --rm -p 5000:5000 \
  -e PORT=5000 \
  -e API_INTERNAL_PORT=4000 \
  -e DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5432/vedlogistics" \
  -e JWT_SECRET="your-secret" \
  -e NODE_ENV=production \
  ved-logistics-postgres
```

## Render Deployment

This repo includes a Render Blueprint file: `render.yaml`

The Blueprint now provisions:

- one Docker web service: `ved-logistics-web`
- one managed PostgreSQL database: `ved-logistics-db`

### Render Blueprint setup

1. Push this repo to GitHub.
2. In Render, choose `New +` -> `Blueprint`.
3. Select this repository.
4. Render will detect `render.yaml` and create:
   - a web service for the app
   - a PostgreSQL database
5. Deploy the Blueprint.

### Important notes

- `DATABASE_URL` is wired automatically from the Render Postgres database through the Blueprint.
- The backend auto-initializes the PostgreSQL schema on startup.
- Health check path is `/api/health`.
- `NEXT_PUBLIC_API_URL=/api` is already configured so the frontend and backend work from the same Render URL.

### After first deploy

Seed the default login accounts:

```bash
curl -X POST https://YOUR-RENDER-URL/api/auth/seed
```

Then use:

- Admin: `admin` / `admin123`
- Employee: `employee01` / `admin123`

### Manual Render env vars

Already handled in the Blueprint:

- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL=/api`
- `API_INTERNAL_PORT=4000`
- `DISABLE_DAILY_SUMMARY=true`

`JWT_SECRET` is generated automatically by the Blueprint.

## Project Structure

- `frontend/` - Next.js UI
- `backend/` - Express API
- `frontend/public/preview/` - premium static preview and system mock
- `render.yaml` - Render blueprint
- `docker-compose.yml` - local PostgreSQL service
