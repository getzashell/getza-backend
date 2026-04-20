FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
COPY src ./src/

RUN npm install --include=dev && \
    node node_modules/.bin/prisma generate && \
    npm run build

ENV NODE_ENV=production PORT=4000
EXPOSE 4000

CMD ["node", "dist/index.js"]
