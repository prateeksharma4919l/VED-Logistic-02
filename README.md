# Ved Logistics

Ved Logistics is a full-stack admin, employee, and rider workspace with attendance, salary, advance payments, payment history, reports, and PDF export.

This repo also includes a premium static preview inside `frontend/public/preview/` so the project can be shown both as a working app and as a polished design/demo system.

## Stack

- Frontend: Next.js 14, TypeScript
- Backend: Express, TypeScript
- Database: PostgreSQL
- Deployment: Render-ready Docker web service

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

### Required Render env vars

Set these on the Render web service:

- `DATABASE_URL`
- `JWT_SECRET`

Already handled in blueprint:

- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL=/api`
- `API_INTERNAL_PORT=4000`
- `DISABLE_DAILY_SUMMARY=true`

### Steps

1. Push this repo to GitHub.
2. In Render, create a new Blueprint using this repo.
3. Set `DATABASE_URL` to your Render PostgreSQL external URL.
4. Set `JWT_SECRET`.
5. Deploy.

Health check:

- `/api/health`

## Project Structure

- `frontend/` - Next.js UI
- `backend/` - Express API
- `frontend/public/preview/` - premium static preview and system mock
- `render.yaml` - Render blueprint
- `docker-compose.yml` - local PostgreSQL service
