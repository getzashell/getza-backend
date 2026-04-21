FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="postgresql://neondb_owner:npg_3tazongv1ANh@ep-icy-hat-abt4jwpw-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"
CMD node -e "console.log('Dockerfile working'); const {PrismaClient} = require('@prisma/client'); console.log('Prisma loaded'); const prisma = new PrismaClient({datasources:{db:{url:process.env.DATABASE_URL}}}); console.log('Prisma client created'); process.exit(0);"
