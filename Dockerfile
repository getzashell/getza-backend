FROM node:22-alpine
WORKDIR /app
RUN echo "Test build"
CMD ["node", "-e", "console.log('Done')"]
