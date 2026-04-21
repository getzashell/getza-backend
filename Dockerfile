FROM node:22-alpine
WORKDIR /app
RUN echo "Legacy Dockerfile - not used with node runtime"
CMD ["echo", "Using render.yaml node runtime"]
