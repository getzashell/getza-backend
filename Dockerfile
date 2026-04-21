FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY tsconfig.json ./
COPY src ./src
RUN npx tsc -p tsconfig.json
EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000
CMD ["node", "dist/index.js"]
