FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json .
COPY prisma ./prisma
RUN npx prisma generate
RUN npx tsc -p tsconfig.json
EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="postgresql://neondb_owner:npg_3tazongv1ANh@ep-icy-hat-abt4jwpw-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"
CMD ["node", "dist/index.js"]
