FROM node:22-alpine

WORKDIR /app

# Copy only what we need for the build
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/

# Build the TypeScript
RUN npm install --include=dev && \
    npx prisma generate && \
    npm run build && \
    chown -R node:node /app

# Switch to non-root user for safety
USER node

ENV NODE_ENV=production PORT=4000
EXPOSE 4000

CMD ["node", "dist/index.js"]
