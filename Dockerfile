FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json

RUN npm ci

COPY . .

RUN npm run build --workspace backend
RUN npm run build --workspace frontend

FROM node:20-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000
ENV API_INTERNAL_PORT=4000
ENV NEXT_PUBLIC_API_URL=/api

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json

RUN npm ci --omit=dev

COPY --from=builder /app/frontend/.next frontend/.next
COPY --from=builder /app/frontend/public frontend/public
COPY --from=builder /app/frontend/next.config.js frontend/next.config.js
COPY --from=builder /app/backend/dist backend/dist
COPY --from=builder /app/backend/src/config backend/src/config
COPY --from=builder /app/start.sh start.sh

RUN chmod +x /app/start.sh

EXPOSE 5000

CMD ["/app/start.sh"]
